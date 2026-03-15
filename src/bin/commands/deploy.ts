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
 *   dndev deploy --skip-build  — skip build step (deploy existing build)
 *   dndev deploy --force      — force deployment / cleanup
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { deploy as main } from '@donotdev/tooling';
