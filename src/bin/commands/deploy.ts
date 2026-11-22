// packages/cli/src/bin/commands/deploy.ts
/**
 * @fileoverview Deploy Command
 * @description Deploy your application to Firebase or Vercel.
 * Automatically detects the provider and app configuration. Supports staging
 * deployments and project-specific overrides.
 *
 * Usage:
 *   dndev deploy              — interactive app and target selection
 *   dndev deploy <app>        — deploy specific app
 *   dndev deploy --staging    — deploy using staging environment
 *   dndev deploy --project <id> — override Firebase project ID
 *   dndev deploy --scope <frontend|functions|rules|both|all> — what to deploy (implies --yes)
 *   dndev deploy --yes        — non-interactive: never prompt, fail naming the missing flag
 *   dndev deploy --skip-build  — reuse existing builds (default: build)
 *   dndev deploy --no-sync-secrets — skip pushing the secrets functions.yaml binds to Firebase Secret Manager
 *   dndev deploy --from-git  — Next.js on Vercel: Vercel builds from linked Git (default is local build + upload)
 *   dndev deploy --force      — delete deployed functions missing locally (default: off; the deploy aborts and names them)
 *   dndev deploy --dry-run    — validate and print every command/request; change nothing
 *   dndev deploy -q / --verbose — log level (errors only / more detail)
 *
 * Unattended: dndev deploy <app> --scope <target> [-p <id>] --yes
 * Flags: packages/tooling/src/cli/command-registry.ts (deploy entry).
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { deploy as main } from '@donotdev/tooling';
