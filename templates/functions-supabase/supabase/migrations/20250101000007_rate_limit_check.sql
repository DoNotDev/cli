-- Migration: atomic rate-limit check RPC for Supabase Edge Functions
-- Purpose: createSupabaseHandler checks every call's rate limit through public.rate_limit_check
-- (packages/functions/src/supabase/utils/rateLimiter.ts, RATE_LIMIT_CHECK_SQL). Without this
-- function the limiter fails closed and every Edge Function call answers 429.
-- EXECUTE for service_role only; SECURITY DEFINER because rate_limits has RLS on and no policy.

CREATE OR REPLACE FUNCTION public.rate_limit_check(
  p_key               TEXT,
  p_max_attempts      INT,
  p_window_ms         BIGINT,
  p_block_duration_ms BIGINT
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_now             TIMESTAMPTZ := clock_timestamp();
  v_window_interval INTERVAL    := (p_window_ms || ' milliseconds')::INTERVAL;
  v_block_interval  INTERVAL    := (p_block_duration_ms || ' milliseconds')::INTERVAL;
  v_row             public.rate_limits%ROWTYPE;
BEGIN
  -- Single atomic upsert: INSERT on first call, conditional UPDATE thereafter (no SELECT → UPDATE race).
  INSERT INTO public.rate_limits (key, attempts, window_start, block_until, last_updated)
  VALUES (p_key, 1, v_now, NULL, v_now)
  ON CONFLICT (key) DO UPDATE SET
    window_start = CASE
      WHEN rate_limits.window_start + v_window_interval <= v_now THEN v_now
      ELSE rate_limits.window_start
    END,
    attempts = CASE
      -- Currently blocked: do not increment (the request is rejected below)
      WHEN rate_limits.block_until IS NOT NULL AND v_now < rate_limits.block_until
        THEN rate_limits.attempts
      -- Window expired: reset the counter
      WHEN rate_limits.window_start + v_window_interval <= v_now
        THEN 1
      -- Within the window: increment
      ELSE rate_limits.attempts + 1
    END,
    block_until = CASE
      -- Keep an existing block
      WHEN rate_limits.block_until IS NOT NULL AND v_now < rate_limits.block_until
        THEN rate_limits.block_until
      -- Window just reset: no block
      WHEN rate_limits.window_start + v_window_interval <= v_now
        THEN NULL
      -- Threshold just exceeded: block
      WHEN rate_limits.attempts + 1 >= p_max_attempts
        THEN v_now + v_block_interval
      ELSE NULL
    END,
    last_updated = v_now
  RETURNING * INTO v_row;

  IF v_row.block_until IS NOT NULL AND v_now < v_row.block_until THEN
    RETURN jsonb_build_object(
      'allowed',                 false,
      'remaining',               0,
      'reset_at_epoch_ms',       EXTRACT(EPOCH FROM v_row.block_until)::BIGINT * 1000,
      'block_remaining_seconds', CEIL(EXTRACT(EPOCH FROM (v_row.block_until - v_now)))::INT
    );
  END IF;

  RETURN jsonb_build_object(
    'allowed',                 true,
    'remaining',               GREATEST(0, p_max_attempts - v_row.attempts),
    'reset_at_epoch_ms',       EXTRACT(EPOCH FROM (v_row.window_start + v_window_interval))::BIGINT * 1000,
    'block_remaining_seconds', NULL
  );
END;
$$;

REVOKE ALL ON FUNCTION public.rate_limit_check(TEXT, INT, BIGINT, BIGINT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rate_limit_check(TEXT, INT, BIGINT, BIGINT) TO service_role;
