// packages/cli/src/bin/commands/dev.ts
/**
 * @fileoverview Dev Command
 * @description Start the development server for an app with smart app detection.
 * Runs 'turbo dev' with appropriate environment variables and process cleanup.
 *
 * Usage:
 *   dndev dev                 — interactive app selection
 *   dndev dev <app>           — start dev server for specified app
 *   dndev dev:<app>           — alternative colon syntax
 *
 * @version 0.0.2
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { dev as main } from '@donotdev/tooling';
