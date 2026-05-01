// packages/cli/src/bin/commands/cacheout.ts
/**
 * @fileoverview Cacheout Command
 * @description Universal cache cleaning utility for modern JS/TS projects.
 * Safely removes build artifacts and cache directories (.vite, dist, .next, .turbo, etc.)
 * while preserving dependencies. Resolves build issues and frees disk space.
 *
 * Usage:
 *   dndev cacheout            — clean all cache artifacts
 *   dndev cacheout --app <app> — clean cache for specific app only
 *   dndev cacheout --dry-run  — show what would be removed
 *   dndev cacheout --verbose  — show detailed item lookup
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { cacheout as main } from '@donotdev/tooling';
