// packages/cli/src/bin/commands/setup.ts
/**
 * @fileoverview Setup Command
 * @description Automatically set up infrastructure for detected providers.
 * Validates credentials across all apps and runs provider-specific wizards
 * to automate project configuration. Includes health checks for setup validation.
 *
 * Usage:
 *   dndev setup               — interactive setup for detected providers
 *   dndev setup <provider>    — setup specific provider (firebase|supabase|vercel)
 *   dndev setup --dry-run     — show plan without applying changes
 *   dndev setup --verbose     — show detailed setup progress
 *
 * @version 0.0.5
 * @since 0.0.16
 * @author AMBROISE PARK Consulting
 */

export { setup as main } from '@donotdev/tooling';
