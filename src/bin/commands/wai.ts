// packages/cli/src/bin/commands/wai.ts
/**
 * @fileoverview WAI-WAY Command
 * @description Output the WAI-WAY activation prompt to your terminal or clipboard.
 * The prompt reads your AI.md file and instructs your AI agent (Claude, Cursor, etc.)
 * on how to build your application according to the DoNotDev protocol.
 *
 * Usage:
 *   dndev wai                 — print activation prompt to terminal
 *   dndev wai --copy          — print and copy to clipboard
 *   dndev wai --workflow      — show workflow summary (Phase 0-4) only
 *   dndev wai-way             — alternative command alias
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { wai as main } from '@donotdev/tooling';
