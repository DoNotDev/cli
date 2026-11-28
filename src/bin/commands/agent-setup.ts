// packages/cli/src/bin/commands/agent-setup.ts
/**
 * @fileoverview Agent Setup Command
 * @description Configure MCP servers for DoNotDev across different AI agents.
 * Runs the AI harness step of `dndev bump` (our MCP server in .mcp.json, .cursor/mcp.json,
 * .gemini/settings.json; removed instead under DNDEV_HARNESS=global), then merges the same
 * server into Claude Desktop's global config (macOS / Windows).
 *
 * Usage:
 *   dndev agent-setup         — configure all available AI agents
 *   dndev agent-setup --dry-run — show what would be configured
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { agentSetup as main } from '@donotdev/tooling';
