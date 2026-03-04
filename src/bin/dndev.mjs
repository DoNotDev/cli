#!/usr/bin/env node
/**
 * @fileoverview DoNotDev CLI - Consumer Entry Point
 * @description Public CLI for DoNotDev framework consumers.
 * Reads COMMAND_REGISTRY (single source of truth) and wires Commander. That's it.
 *
 * ARCHITECTURE:
 * - Registry defines commands, options, aliases, action patterns
 * - This file loops the registry and registers Commander commands
 * - ACTION_OVERRIDES handle commands with non-trivial arg mapping
 * - Everything else is standard: lazy import → main(options)
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

// ============================================================================
// VERSION — injected by esbuild at bundle time, fallback for dev
// ============================================================================

/* global __CLI_VERSION__ */
const CLI_VERSION = typeof __CLI_VERSION__ !== 'undefined' ? __CLI_VERSION__ : '0.0.0';

const args = process.argv.slice(2);

// Handle --version immediately (before any imports)
if (args.length === 1 && (args[0] === '--version' || args[0] === '-v')) {
  console.log(CLI_VERSION);
  process.exit(0);
}

// Handle --help immediately (from registry — inlined by esbuild)
if (args.length === 0 || (args.length === 1 && (args[0] === '--help' || args[0] === '-h'))) {
  const { generateHelpText } = await import('@donotdev/tooling/src/cli/command-registry.ts');
  console.log(`DoNotDev CLI v${CLI_VERSION}\n`);
  console.log(generateHelpText('dndev'));
  process.exit(0);
}

// ============================================================================
// IMPORTS
// ============================================================================

import { Command } from 'commander';
import {
  getPublicCommands,
  getAppCommandNames,
} from '@donotdev/tooling/src/cli/command-registry.ts';
import {
  baseName,
  extractCommonOptions,
  registerCommand,
} from '@donotdev/tooling/src/cli/entry-helpers.ts';

// ============================================================================
// PROGRAM SETUP
// ============================================================================

const program = new Command();

program
  .name('dndev')
  .description('DoNotDev Framework CLI')
  .version(CLI_VERSION, '-v, --version', 'display version number')
  .usage('<command>[:<app>] [options]')
  .helpCommand('help [command]', 'display help for command');

// ============================================================================
// ACTION OVERRIDES — commands with non-trivial arg mapping
// ============================================================================

/**
 * Run an app command by temporarily setting process.argv for tooling's main().
 */
async function runAppCommand(commandPath, app, commonOptions) {
  const savedArgv = process.argv;
  process.argv = app
    ? [savedArgv[0], savedArgv[1], app]
    : [savedArgv[0], savedArgv[1]];
  try {
    const { main } = await import(commandPath);
    process.exitCode = await main(commonOptions);
  } catch (error) {
    console.error(`Command failed: ${error.message}`);
    process.exitCode = error.context?.exitCode || 1;
  } finally {
    process.argv = savedArgv;
  }
}

/** Make default 'standard' action: lazy import → main(options) */
function makeStandardAction(commandPath) {
  return async (options, ...positionalArgs) => {
    try {
      const { main } = await import(commandPath);
      await main(options, ...positionalArgs);
    } catch (error) {
      console.error(`Command failed: ${error.message}`);
      process.exitCode = error.context?.exitCode || 1;
    }
  };
}

/** Make default 'app' action: mutate process.argv, call main() */
function makeAppAction(commandPath) {
  return async (options, app) => {
    await runAppCommand(commandPath, app, extractCommonOptions(options));
  };
}

const ACTION_OVERRIDES = {
  'create-app': async (options, name) => {
    const appName = name || options.name;
    const { main } = await import('./commands/create-app.js');
    if (appName) {
      await main({
        ...options,
        name: appName,
      });
    } else {
      await main(options);
    }
  },

  'type-check': async (options, app) => {
    const { main } = await import('./commands/type-check.js');
    process.exitCode = await main({ ...options, package: app });
  },

  'cacheout': async (options, app) => {
    if (app) options.app = app;
    const { main } = await import('./commands/cacheout.js');
    process.exitCode = await main(options);
  },

  'staging': async (options, app) => {
    const { main } = await import('./commands/deploy.js');
    await main({ ...options, app, staging: true });
  },

  'deploy': async (options, app) => {
    const { main } = await import('./commands/deploy.js');
    await main({ ...options, app });
  },

  'sync-secrets': async (options) => {
    if (options.project) options.projectId = options.project;
    const { main } = await import('./commands/sync-secrets.js');
    process.exitCode = await main(options);
  },

  'make-admin': async (options, userId) => {
    const args = [];
    if (userId) args.push(userId);
    if (options.project) args.push(`--project=${options.project}`);
    if (options.projectId) args.push(`--project-id=${options.projectId}`);
    if (options.super) args.push('--super');
    if (options.dryRun) args.push('--dry-run');
    if (options.verbose) args.push('--verbose');
    if (options.debug) args.push('--debug');
    try {
      const { main } = await import('./commands/make-admin.js');
      await main(args);
    } catch (error) {
      console.error(`make-admin failed: ${error.message}`);
      process.exitCode = error.context?.exitCode || 1;
    }
  },

  'setup': async (options, provider) => {
    const { main } = await import('./commands/setup.js');
    process.exitCode = await main({ ...options, provider });
  },

  'doctor': async (options) => {
    const { main } = await import('./commands/doctor.js');
    process.exitCode = await main({ ...options, check: options.check });
  },

  'wai': async () => {
    const { main } = await import('./commands/wai.js');
    process.exitCode = await main();
  },

  'agent-setup': async (options) => {
    const { main } = await import('./commands/agent-setup.js');
    await main(options);
  },

  'init': async (options, name) => {
    const { main } = await import('./commands/create-project.js');
    await main({ ...options, projectName: name || options.projectName });
  },
};

// ============================================================================
// REGISTER ALL PUBLIC COMMANDS FROM REGISTRY
// ============================================================================

for (const def of getPublicCommands()) {
  const cmdName = baseName(def.name);
  const wrapperFile = def.wrapperFile ?? cmdName;
  const commandPath = `./commands/${wrapperFile}.js`;

  const override = ACTION_OVERRIDES[def.name] ?? ACTION_OVERRIDES[cmdName];

  let action;
  if (override) {
    action = override;
  } else if (def.actionPattern === 'app') {
    action = makeAppAction(commandPath);
  } else {
    action = makeStandardAction(commandPath);
  }

  registerCommand(program, def, action);
}

// ============================================================================
// PARSE AND EXECUTE
// ============================================================================

function preprocessArgs(rawArgs) {
  if (rawArgs.length === 0) return rawArgs;

  const firstArg = rawArgs[0];
  const appCommands = getAppCommandNames();

  if (firstArg && firstArg.includes(':')) {
    const colonIndex = firstArg.indexOf(':');
    const command = firstArg.substring(0, colonIndex);
    const app = firstArg.substring(colonIndex + 1);

    if (appCommands.includes(command) && app) {
      return [command, app, ...rawArgs.slice(1)];
    }
  }

  return rawArgs;
}

program.on('command:*', () => {
  console.error(`Unknown command: ${program.args.join(' ')}`);
  console.error('Run "dndev --help" for available commands.');
  process.exit(1);
});

program.parse([process.argv[0], process.argv[1], ...preprocessArgs(args)]);
