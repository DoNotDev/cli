// packages/cli/src/bin/commands/preview.ts
/**
 * @fileoverview Preview Command
 * @description Preview the production build of an app with smart app detection.
 * Automatically runs a build if one doesn't exist before starting the preview.
 *
 * Usage:
 *   dndev preview             — interactive app selection
 *   dndev preview <app>       — preview production build for app
 *   dndev preview:<app>       — alternative colon syntax
 *
 * @version 0.0.2
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { preview as main } from '@donotdev/tooling';
