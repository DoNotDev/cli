// packages/cli/src/bin/commands/emu.ts
/**
 * @fileoverview Emulator Command
 * @description Start the development server with a local backend stack.
 * Auto-detects platform (Firebase/Supabase) and starts the relevant emulators
 * or local Docker stack before running the app dev server.
 *
 * Usage:
 *   dndev emu                 — start dev with all local backend services
 *   dndev emu <app>           — start emulators for specific app
 *   dndev emu --auth          — only start Firebase auth emulator
 *   dndev emu --services auth,functions — specify exact Firebase services
 *   dndev emu --stripe        — include Stripe webhook forwarding
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { emu as main } from '@donotdev/tooling';
