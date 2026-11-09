-- Migration: Create webhook_events table for Stripe webhook idempotency
-- Generated: 2026-11-04
-- Purpose: Atomic per-event reservation with an owner token, so each Stripe event is processed once
-- Schedule: Daily at 5 AM UTC (cleanup of rows older than 30 days)
-- Source of truth: WEBHOOK_EVENTS_SQL in @donotdev/functions (shared/billing/idempotency.ts)

CREATE TABLE IF NOT EXISTS public.webhook_events (
  event_id     TEXT        PRIMARY KEY,
  status       TEXT        NOT NULL CHECK (status IN ('processing', 'processed')),
  owner_token  UUID        NOT NULL,
  reserved_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ
);

-- Only service_role accesses this table
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_webhook_events_processed_at
  ON public.webhook_events (processed_at);

-- The functions below run as the caller (SECURITY INVOKER) and refuse every
-- role but service_role. EXECUTE is deliberately not revoked: on Supabase
-- Postgres 17.6.1.x a permission-denied function call by anon/authenticated
-- crashes the backend (signal 11), which restarts every connection.
CREATE OR REPLACE FUNCTION public.webhook_events_assert_service_role()
RETURNS VOID
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF current_user IS DISTINCT FROM 'service_role' THEN
    RAISE EXCEPTION 'webhook_events is reserved to service_role (current role: %)', current_user
      USING ERRCODE = 'insufficient_privilege';
  END IF;
END;
$$;

-- Atomic reservation. Returns:
--   'reserved'    the caller now owns the event under p_owner_token
--   'processed'   the event was already processed (skip, answer 2xx)
--   'in_progress' another worker holds a live lease (answer non-2xx, Stripe retries)
-- A 'processing' row older than the lease is retaken (abandoned worker).
CREATE OR REPLACE FUNCTION public.webhook_event_reserve(
  p_event_id      TEXT,
  p_owner_token   UUID,
  p_lease_seconds INT
)
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  v_status TEXT;
BEGIN
  PERFORM public.webhook_events_assert_service_role();

  INSERT INTO public.webhook_events (event_id, status, owner_token, reserved_at)
  VALUES (p_event_id, 'processing', p_owner_token, clock_timestamp())
  ON CONFLICT (event_id) DO UPDATE
    SET owner_token = EXCLUDED.owner_token,
        reserved_at = clock_timestamp()
    WHERE webhook_events.status = 'processing'
      AND webhook_events.reserved_at
          < clock_timestamp() - make_interval(secs => p_lease_seconds);
  IF FOUND THEN
    RETURN 'reserved';
  END IF;

  SELECT status INTO v_status
    FROM public.webhook_events
   WHERE event_id = p_event_id;
  IF v_status = 'processed' THEN
    RETURN 'processed';
  END IF;
  -- Live lease, or the row was released in between: Stripe retries either way
  RETURN 'in_progress';
END;
$$;

-- Mark a reservation processed. Returns false when p_owner_token no longer owns
-- the row (lease retaken, released, or deleted). Repeating it for the same
-- owner is a no-op that returns true.
CREATE OR REPLACE FUNCTION public.webhook_event_mark_processed(
  p_event_id    TEXT,
  p_owner_token UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  PERFORM public.webhook_events_assert_service_role();

  UPDATE public.webhook_events
     SET status = 'processed',
         processed_at = COALESCE(processed_at, clock_timestamp())
   WHERE event_id = p_event_id
     AND owner_token = p_owner_token;
  RETURN FOUND;
END;
$$;

-- Drop a reservation after a processing failure. Returns false when
-- p_owner_token does not own a 'processing' row (nothing is deleted).
CREATE OR REPLACE FUNCTION public.webhook_event_release(
  p_event_id    TEXT,
  p_owner_token UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  PERFORM public.webhook_events_assert_service_role();

  DELETE FROM public.webhook_events
   WHERE event_id = p_event_id
     AND owner_token = p_owner_token
     AND status = 'processing';
  RETURN FOUND;
END;
$$;

-- Enable pg_cron extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Cleanup webhook events older than 30 days (daily at 5 AM UTC).
-- Stripe retries an event for up to 3 days, so older rows are never read again.
SELECT cron.schedule(
  'cleanup-webhook-events',
  '0 5 * * *',
  $$DELETE FROM public.webhook_events WHERE COALESCE(processed_at, reserved_at) < now() - interval '30 days'$$
);
