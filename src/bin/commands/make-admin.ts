// packages/cli/src/bin/commands/make-admin.ts
/**
 * @fileoverview Make Admin Command
 * @description Assign administrative roles to users.
 * Sets custom claims (Firebase) or app_metadata (Supabase) for the target user.
 * Supports email or UUID lookup depending on the platform.
 *
 * Usage:
 *   dndev make-admin <user>    — assign admin role to user (email or UUID)
 *   dndev make-admin --super  — assign super role (includes isSuper: true)
 *   dndev make-admin --project <id> — specific Firebase/Supabase project
 *   dndev ma <user>           — alternative command alias
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { makeAdmin as main } from '@donotdev/tooling';
