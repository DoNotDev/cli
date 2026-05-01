// packages/cli/src/bin/commands/format.ts
/**
 * @fileoverview Format Command
 * @description Standardized project-wide formatting according to framework rules.
 * Adds file path headers, fixes 'use client' ordering, and runs Prettier.
 * Ensures consistent source files for better AI agent parsing.
 *
 * Usage:
 *   dndev format              — format all source files in the project
 *   dndev format --dry-run    — show what would be formatted
 *   dndev format --verbose    — show per-file formatting logs
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { format as main } from '@donotdev/tooling';
