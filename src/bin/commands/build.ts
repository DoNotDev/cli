// packages/cli/src/bin/commands/build.ts
/**
 * @fileoverview Build Command
 * @description Build app for production (with smart app detection and build type selection).
 * Can build frontend, functions, or both. Auto-detects app configuration.
 *
 * Usage:
 *   dndev build              — interactive app and build type selection
 *   dndev build <app>        — build specified app
 *   dndev build <app>:front  — build app frontend only
 *   dndev build <app>:func   — build app functions only
 *   dndev build <app>:both   — build both frontend and functions
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { build as main } from '@donotdev/tooling';
