// packages/cli/src/bin/commands/coach.ts
/**
 * @fileoverview Coach Command
 * @description Repo-level advisor that scans all apps and detects providers.
 * Generates a unified, numbered checklist for manual provider setup.
 * No prompts, no automation — just clear guidance.
 *
 * Usage:
 *   dndev coach               — run health check and show setup checklist
 *   dndev coach --verbose     — show more detail
 *
 * @version 0.0.2
 * @since 0.0.17
 * @author AMBROISE PARK Consulting
 */

export { coach as main } from '@donotdev/tooling';
