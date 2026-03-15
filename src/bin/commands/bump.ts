// packages/cli/src/bin/commands/bump.ts
/**
 * @fileoverview Bump Command
 * @description Update @donotdev/* packages and external dependencies to latest
 * compatible versions. Syncs documentation, demo app, and cockpit app from
 * framework templates. Multi-select what to update.
 *
 * Usage:
 *   dndev bump                — interactive multi-select (packages, docs, apps)
 *
 * @version 0.1.0
 * @since 0.0.2
 * @author AMBROISE PARK Consulting
 */

export { bump as main } from '@donotdev/tooling';
