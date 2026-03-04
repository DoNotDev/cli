// packages/cli/src/bin/commands/type-check.ts
/**
 * @fileoverview Type Check Command
 * @description Run TypeScript type-checking across all packages and apps in the project.
 * Includes security checks for direct imports from private core packages.
 * Generates detailed error logs for better debugging.
 *
 * Usage:
 *   dndev type-check          — type-check the entire project
 *   dndev type-check <pkg>    — type-check specific package or app
 *   dndev tc <pkg>            — alternative command alias
 *   dndev type-check --verbose — show full tsc output for errors
 *   dndev type-check --debug   — show internal detection logic
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { typeCheck as main } from '@donotdev/tooling';
