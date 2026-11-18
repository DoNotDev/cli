// packages/cli/src/bin/commands/db-check.ts
/**
 * @fileoverview DB Check Command
 * @description Lists, per generated CHECK constraint (`<table>_<column>_<rule>`, added
 * NOT VALID), the row ids that violate it. Read-only (Supabase).
 *
 * Usage:
 *   dndev db-check [app]
 *
 * @version 0.1.0
 * @since 0.2.5
 * @author AMBROISE PARK Consulting
 */

export { dbCheck as main } from '@donotdev/tooling';
