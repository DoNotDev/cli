-- Migration: Create crud_bulk RPC for atomic multi-op CRUD against one collection
-- Generated: 2026-02-19
-- Purpose: Backs the Supabase edge handler at packages/functions/src/supabase/crud/bulk.ts
-- Contract: one table per call, three ordered buckets (inserts, updates, deletes),
--           all-or-nothing via the implicit PL/pgSQL transaction.

-- Semantics (mirrors BULK_CRUD_TODO.md):
--   1. Validate p_collection (length + quote_ident safety).
--   2. Reject empty batches (defense in depth — handler short-circuits too).
--   3. Inserts: use client-provided id if present, else gen_random_uuid().
--   4. Updates: apply partial patch — only keys in patch are overwritten.
--   5. Deletes: by id.
--   6. Any failure raises — Postgres rolls the function back as a unit.
--   7. Returns { inserted_ids, updated_ids, deleted_ids } in snake_case.

CREATE OR REPLACE FUNCTION crud_bulk(
  p_collection TEXT,
  p_inserts    JSONB,
  p_updates    JSONB,
  p_deletes    JSONB
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _inserted_ids TEXT[] := ARRAY[]::TEXT[];
  _updated_ids  TEXT[] := ARRAY[]::TEXT[];
  _deleted_ids  TEXT[] := ARRAY[]::TEXT[];

  _insert_count INTEGER;
  _update_count INTEGER;
  _delete_count INTEGER;

  _row           JSONB;
  _row_with_id   JSONB;
  _update_entry  JSONB;
  _patch         JSONB;
  _update_id     TEXT;
  _delete_id     TEXT;
  _inserted_id   TEXT;
  _updated_id    TEXT;
  _deleted_id    TEXT;

  _set_sql     TEXT;
  _patch_key   TEXT;
  _patch_value JSONB;
  _first_key   BOOLEAN;
BEGIN
  -- 1. Collection name validation — length-bound and safe for quote_ident.
  IF p_collection IS NULL OR length(p_collection) = 0 THEN
    RAISE EXCEPTION 'crud_bulk: p_collection must be a non-empty text';
  END IF;
  IF length(p_collection) > 63 THEN
    RAISE EXCEPTION 'crud_bulk: p_collection exceeds 63-char Postgres identifier limit';
  END IF;

  -- 2. Reject empty batches — handler already short-circuits, but we enforce
  --    the same contract at the SQL boundary.
  _insert_count := COALESCE(jsonb_array_length(p_inserts), 0);
  _update_count := COALESCE(jsonb_array_length(p_updates), 0);
  _delete_count := COALESCE(jsonb_array_length(p_deletes), 0);

  IF _insert_count = 0 AND _update_count = 0 AND _delete_count = 0 THEN
    RAISE EXCEPTION 'crud_bulk: at least one of p_inserts, p_updates, p_deletes must be non-empty';
  END IF;

  -- 3. Inserts — preserve input order. Client-generated ids win; otherwise
  --    allocate a uuid. jsonb_populate_record handles type coercion against
  --    the real table schema, so unknown keys are ignored and typed columns
  --    are cast correctly.
  IF _insert_count > 0 THEN
    FOR _row IN SELECT value FROM jsonb_array_elements(p_inserts)
    LOOP
      IF _row ? 'id' AND jsonb_typeof(_row -> 'id') = 'string' THEN
        _row_with_id := _row;
      ELSE
        _row_with_id := _row || jsonb_build_object('id', gen_random_uuid()::text);
      END IF;

      EXECUTE format(
        'INSERT INTO %1$I SELECT * FROM jsonb_populate_record(NULL::%1$I, $1) RETURNING id',
        p_collection
      )
      USING _row_with_id
      INTO _inserted_id;

      IF _inserted_id IS NULL THEN
        RAISE EXCEPTION 'crud_bulk: insert into % returned no id', p_collection;
      END IF;

      _inserted_ids := _inserted_ids || _inserted_id;
    END LOOP;
  END IF;

  -- 4. Updates — partial patches. We build a dynamic SET clause from the
  --    patch keys so unspecified columns are untouched (jsonb_populate_record
  --    would overwrite them with NULLs). Each patch key is quoted via
  --    quote_ident; values are applied as jsonb with -> lookups inside the
  --    generated SQL, binding the whole patch as a single $2 parameter.
  IF _update_count > 0 THEN
    FOR _update_entry IN SELECT value FROM jsonb_array_elements(p_updates)
    LOOP
      IF NOT (_update_entry ? 'id') OR jsonb_typeof(_update_entry -> 'id') <> 'string' THEN
        RAISE EXCEPTION 'crud_bulk: each update entry must carry a string "id"';
      END IF;
      IF NOT (_update_entry ? 'patch') OR jsonb_typeof(_update_entry -> 'patch') <> 'object' THEN
        RAISE EXCEPTION 'crud_bulk: each update entry must carry an object "patch"';
      END IF;

      _update_id := _update_entry ->> 'id';
      _patch     := _update_entry -> 'patch';

      -- Empty patch is a no-op at the app layer; refuse it here too so a
      -- caller mistake surfaces loudly instead of silently "succeeding".
      IF (SELECT count(*) FROM jsonb_object_keys(_patch)) = 0 THEN
        RAISE EXCEPTION 'crud_bulk: update patch for id=% is empty', _update_id;
      END IF;

      _set_sql   := '';
      _first_key := TRUE;
      FOR _patch_key, _patch_value IN SELECT * FROM jsonb_each(_patch)
      LOOP
        IF NOT _first_key THEN
          _set_sql := _set_sql || ', ';
        END IF;
        -- quote_ident keeps the column name safe; the value is bound via
        -- $2 ->> 'key' so no user data is ever concatenated into SQL.
        _set_sql := _set_sql
          || quote_ident(_patch_key)
          || ' = (jsonb_populate_record(NULL::'
          || quote_ident(p_collection)
          || ', $2)).'
          || quote_ident(_patch_key);
        _first_key := FALSE;
      END LOOP;

      EXECUTE format(
        'UPDATE %I SET %s WHERE id = $1 RETURNING id',
        p_collection,
        _set_sql
      )
      USING _update_id, _patch
      INTO _updated_id;

      IF _updated_id IS NULL THEN
        RAISE EXCEPTION 'crud_bulk: update on % with id=% matched no row', p_collection, _update_id;
      END IF;

      _updated_ids := _updated_ids || _updated_id;
    END LOOP;
  END IF;

  -- 5. Deletes — by id, preserve input order.
  IF _delete_count > 0 THEN
    FOR _delete_id IN SELECT value #>> '{}' FROM jsonb_array_elements(p_deletes)
    LOOP
      IF _delete_id IS NULL OR length(_delete_id) = 0 THEN
        RAISE EXCEPTION 'crud_bulk: delete id must be a non-empty string';
      END IF;

      EXECUTE format(
        'DELETE FROM %I WHERE id = $1 RETURNING id',
        p_collection
      )
      USING _delete_id
      INTO _deleted_id;

      IF _deleted_id IS NULL THEN
        RAISE EXCEPTION 'crud_bulk: delete on % with id=% matched no row', p_collection, _delete_id;
      END IF;

      _deleted_ids := _deleted_ids || _deleted_id;
    END LOOP;
  END IF;

  -- 6. Snake_case response — handler normalises both cases but SQL-side
  --    consumers see idiomatic keys.
  RETURN jsonb_build_object(
    'inserted_ids', to_jsonb(_inserted_ids),
    'updated_ids',  to_jsonb(_updated_ids),
    'deleted_ids',  to_jsonb(_deleted_ids)
  );
END;
$$;

-- Service-role only — edge handlers enforce auth + ACL before invoking.
REVOKE EXECUTE ON FUNCTION crud_bulk(TEXT, JSONB, JSONB, JSONB) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION crud_bulk(TEXT, JSONB, JSONB, JSONB) FROM anon, authenticated;
GRANT  EXECUTE ON FUNCTION crud_bulk(TEXT, JSONB, JSONB, JSONB) TO service_role;

COMMENT ON FUNCTION crud_bulk(TEXT, JSONB, JSONB, JSONB) IS 'Atomic bulk CRUD for one collection. Service-role only — edge handlers enforce auth + ACL before invoking.';
