// packages/cli/src/bin/commands/setup-cicd.ts
/**
 * @fileoverview CI/CD Setup Command
 * @description Automatically configure CI/CD for your project.
 * Detects providers, uploads secrets to GitHub via 'gh' CLI, and generates
 * standard GitHub Actions workflow files for build and deployment.
 *
 * Usage:
 *   dndev setup-cicd          — interactive CI/CD setup for your app
 *   dndev setup-cicd <app>    — set up CI/CD for specific app
 *   dndev setup-cicd --staging — include staging environment workflows
 *   dndev setup-cicd --dry-run — show plan without modifying GitHub
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { setupCICD as main } from '@donotdev/tooling';
