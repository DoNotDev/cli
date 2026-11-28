// packages/cli/src/bin/commands/uat.ts
/**
 * @fileoverview UAT Command
 * @description Ship the code on this machine (working tree, installed framework,
 * pending migrations) to the app's UAT environment (Supabase + Vercel apps):
 * apps/<app>/.env.uat and .dndev.uat.secrets, never
 * production values. Always targets UAT: no flag can turn it into a production deploy.
 *
 * Usage:
 *   dndev uat <app>                  — deploy the app to UAT (prompts what to deploy)
 *   dndev uat <app> --scope <frontend|functions|both|all> — what to deploy (implies --yes)
 *   dndev uat <app> --yes            — non-interactive: never prompt, fail naming the missing flag
 *   dndev uat <app> --skip-build     — reuse existing builds (default: build)
 *   dndev uat <app> --dry-run        — validate and print every command/request; change nothing
 *   dndev uat <app> --refresh-data   — first copy production data into UAT (anonymized; storage incremental; overwrites UAT data; asks for confirmation unless --yes), then deploy
 *   dndev uat <app> -q / --verbose   — log level (errors only / more detail)
 *
 * Flags: packages/tooling/src/cli/command-registry.ts (uat entry).
 *
 * @version 0.2.0
 * @since 0.3.7
 * @author AMBROISE PARK Consulting
 */

export { uat as main } from '@donotdev/tooling';
