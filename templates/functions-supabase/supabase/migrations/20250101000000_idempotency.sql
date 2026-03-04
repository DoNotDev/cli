-- Migration: Create idempotency table for Supabase CRUD operations
-- Generated: 2026-02-19
-- Purpose: Store operation results to prevent duplicate processing
-- TTL: 24 hours default, configurable per operation

CREATE TABLE IF NOT EXISTS idempotency (
  id TEXT PRIMARY KEY,                    -- Format: "{operation}_{idempotencyKey}"
  operation TEXT NOT NULL,                 -- 'create', 'update', 'delete', etc.
  idempotency_key TEXT NOT NULL UNIQUE,   -- Client-provided key
  result JSONB NOT NULL,                  -- Cached operation result
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_by TEXT NOT NULL,             -- User ID
  expires_at TIMESTAMPTZ NOT NULL         -- TTL for cleanup (default: 24h)
);

-- Indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_idempotency_expires ON idempotency(expires_at);
CREATE INDEX IF NOT EXISTS idx_idempotency_key ON idempotency(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_idempotency_operation ON idempotency(operation, expires_at);

-- Comments
COMMENT ON TABLE idempotency IS 'Stores idempotency keys and cached operation results to prevent duplicate processing';
COMMENT ON COLUMN idempotency.id IS 'Composite key: {operation}_{idempotencyKey}';
COMMENT ON COLUMN idempotency.expires_at IS 'TTL for automatic cleanup - defaults to 24 hours from processed_at';
