// packages/cli/src/bin/commands/create-app.ts
/**
 * @fileoverview App Creator Command
 * @description Creates individual apps in a workspace with DoNotDev features.
 * Interactive questionnaire or CLI-driven scaffolding of Vite, Next.js, or Expo apps.
 * Automatically adds providers, functions, and standard workspace setup.
 *
 * Usage:
 *   dndev create-app          — interactive app creation questionnaire
 *   dndev create-app <name>   — create app with name (interactive)
 *   dndev create-app <name> --builder vite --functions
 *   dndev create-app <name> --builder next --host vercel --backend supabase
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { createApp as main } from '@donotdev/tooling';
