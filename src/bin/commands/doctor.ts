// packages/cli/src/bin/commands/doctor.ts
/**
 * @fileoverview Doctor Command
 * @description Check project health by validating provider connections and env files.
 * Scans all apps, detects active providers, and runs status checks for each.
 * CI-friendly with exit codes.
 *
 * Usage:
 *   dndev doctor              — run all relevant health checks
 *   dndev doctor --check <id> — run single check (env|firebase|supabase|auth)
 *   dndev doctor --verbose    — show detailed check results
 *
 * @version 0.0.2
 * @since 0.0.16
 * @author AMBROISE PARK Consulting
 */

export { doctor as main } from '@donotdev/tooling';
