// packages/cli/src/index.ts

/**
 * @donotdev/cli - DoNotDev Framework CLI
 *
 * Thin wrapper around @donotdev/tooling for public distribution.
 * Tooling is the source of truth for all CLI code.
 */

// Command functions only - CLI package is for running commands, not programmatic API
export {
  createApp,
  createProject,
  format,
  dev,
  build,
  preview,
  emu,
  cacheout,
  syncSecrets,
  deploy,
  staging,
} from '@donotdev/tooling';
