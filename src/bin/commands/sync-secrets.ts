// packages/cli/src/bin/commands/sync-secrets.ts
/**
 * @fileoverview Secrets Sync Command
 * @description Sync environment variables from local .env files to Firebase Secrets Manager,
 * Vercel environment variables, or GitHub repository secrets.
 * Auto-detects the target platform based on project structure.
 *
 * Usage:
 *   dndev sync-secrets        — sync local .env to detected runtime platform
 *   dndev sync-secrets --target github — sync to GitHub Secrets
 *   dndev sync-secrets --project <id> — specific Firebase project ID
 *   dndev sync-secrets --env-file <file> — use specific env file
 *   dndev sync-secrets --repo <owner/repo> — specify GitHub repository
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { syncSecrets as main } from '@donotdev/tooling';
