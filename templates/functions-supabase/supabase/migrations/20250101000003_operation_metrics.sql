-- Migration: Create operation_metrics table for Supabase Edge Functions monitoring
-- Generated: 2026-02-19
-- Purpose: Track operation success/failure rates, duration, and user activity
-- Retention: 90 days (configurable via cleanup job)

CREATE TABLE IF NOT EXISTS operation_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operation TEXT NOT NULL,                  -- e.g., 'create_apartment', 'get_user'
  user_id TEXT,                             -- NULL for guest operations
  status TEXT NOT NULL,                     -- 'success', 'failed', 'pending'
  duration_ms INTEGER,                      -- Operation duration in milliseconds
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB,                           -- Additional context (request ID, etc.)
  error_code TEXT,                          -- If status = 'failed'
  error_message TEXT                        -- If status = 'failed'
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_metrics_operation ON operation_metrics(operation, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_metrics_user ON operation_metrics(user_id, timestamp DESC) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_metrics_status ON operation_metrics(status, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_metrics_timestamp ON operation_metrics(timestamp DESC);

-- Comments
COMMENT ON TABLE operation_metrics IS 'Tracks operation metrics for monitoring and analytics';
COMMENT ON COLUMN operation_metrics.operation IS 'Operation name (e.g., create_apartment, get_user)';
COMMENT ON COLUMN operation_metrics.duration_ms IS 'Operation duration in milliseconds';
COMMENT ON COLUMN operation_metrics.metadata IS 'Additional context as JSON (request ID, etc.)';
