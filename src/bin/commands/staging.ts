// packages/cli/src/bin/commands/staging.ts
/**
 * @fileoverview Staging Command
 * @description Deploy your application to the staging/UAT environment.
 * Shorthand for 'dndev deploy --staging'. Uses staging-specific configuration
 * (e.g. .env.staging, service-account-key.staging.json).
 *
 * Usage:
 *   dndev staging             — interactive staging deployment
 *   dndev staging <app>       — deploy specific app to staging
 *   dndev uat                 — alternative command alias
 *   dndev staging --project <id> — override staging project ID
 *   dndev staging --skip-build — skip build step (deploy existing)
 *
 * @version 0.1.0
 * @since 0.0.6
 * @author AMBROISE PARK Consulting
 */

export { staging as main } from '@donotdev/tooling';
