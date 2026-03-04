-- Migration: Create rate_limits table for Supabase Edge Functions
-- Generated: 2026-02-19
-- Purpose: Track API call rates per user/IP to prevent abuse
-- Pattern: Same as Firebase Firestore rateLimits collection

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,                    -- Format: "{operation}_{identifier}" (e.g., "create_apartment_uid_123")
  attempts INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  block_until TIMESTAMPTZ,                 -- NULL if not blocked
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for efficient lookups and cleanup
CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON rate_limits(window_start);
CREATE INDEX IF NOT EXISTS idx_rate_limits_block ON rate_limits(block_until) WHERE block_until IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_rate_limits_updated ON rate_limits(last_updated);

-- Comments
COMMENT ON TABLE rate_limits IS 'Tracks API call rates per operation and identifier (user ID or IP)';
COMMENT ON COLUMN rate_limits.key IS 'Composite key: {operation}_{identifier_type}_{identifier_value}';
COMMENT ON COLUMN rate_limits.block_until IS 'Timestamp when rate limit block expires (NULL if not blocked)';
