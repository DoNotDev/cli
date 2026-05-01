// packages/cli/src/bin/commands/db.ts
/**
 * @fileoverview DB Exec Command
 * @description Run custom database scripts with an injected DbContext.
 * Scripts are TypeScript files in .dndev/scripts/ that export a default
 * function receiving a DbContext (typed read/write access to your database).
 *
 * Usage:
 *   dndev db <script>           — run a script from .dndev/scripts/
 *   dndev db ./my-script.ts     — run a script by path
 *   dndev db -l                 — list available scripts
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { db as main } from '@donotdev/tooling';
