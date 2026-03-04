-- Migration: Create cleanup cron jobs for idempotency and rate_limits tables
-- Generated: 2026-02-19
-- Purpose: Automatically clean up expired records to prevent table bloat
-- Schedule: Daily at 2 AM UTC (idempotency), 3 AM UTC (rate_limits), 4 AM UTC (metrics)

-- Enable pg_cron extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Cleanup expired idempotency records (daily at 2 AM UTC)
SELECT cron.schedule(
  'cleanup-idempotency',
  '0 2 * * *',
  $$DELETE FROM idempotency WHERE expires_at < now()$$
);

-- Cleanup old rate limit records (daily at 3 AM UTC)
SELECT cron.schedule(
  'cleanup-rate-limits',
  '0 3 * * *',
  $$DELETE FROM rate_limits WHERE window_start + interval '7 days' < now()$$
);

-- Cleanup old operation metrics (daily at 4 AM UTC)
SELECT cron.schedule(
  'cleanup-operation-metrics',
  '0 4 * * *',
  $$DELETE FROM operation_metrics WHERE timestamp < now() - interval '90 days'$$
);
