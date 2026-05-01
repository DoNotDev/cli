// packages/cli/src/bin/commands/get-demo.ts
/**
 * @fileoverview Get Demo Command
 * @description Copy the demo app template into apps/demo. Works in both development
 * (monorepo) and published (consumer) modes. Use --force to replace an existing demo.
 *
 * Usage:
 *   dndev get-demo            — copy demo app
 *   dndev get-demo --force    — replace existing demo app
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { getDemo as main } from '@donotdev/tooling';
