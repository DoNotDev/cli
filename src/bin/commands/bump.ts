// packages/cli/src/bin/commands/bump.ts
/**
 * @fileoverview Bump Command
 * @description Update @donotdev/* packages and external dependencies to latest
 * compatible versions. Syncs documentation, the AI harness, the demo app and the dndev
 * app from framework templates. Multi-select what to update.
 *
 * Usage:
 *   dndev bump                — interactive multi-select (packages, docs, harness, apps)
 *   dndev bump --yes          — the defaults, no prompt
 *
 * @version 0.1.0
 * @since 0.0.2
 * @author AMBROISE PARK Consulting
 */

export { bump as main } from '@donotdev/tooling';
