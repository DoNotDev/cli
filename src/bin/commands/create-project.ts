// packages/cli/src/bin/commands/create-project.ts
/**
 * @fileoverview Project Creator Command
 * @description Create a new DoNotDev project with complete structure.
 * Scaffolds the workspace, installs dependencies, and prepares the WAI-WAY environment.
 * Alias for 'dndev init'.
 *
 * Usage:
 *   dndev init                — interactive project creation
 *   dndev init <name>         — create project with specific name
 *   dndev create-project      — alternative command name
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { createProject as main } from '@donotdev/tooling';
