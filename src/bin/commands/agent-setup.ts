// packages/cli/src/bin/commands/agent-setup.ts
/**
 * @fileoverview Agent Setup Command
 * @description Configure MCP servers for DoNotDev across different AI agents.
 * Sets up .mcp.json (Claude Code), .cursor/mcp.json (Cursor), .gemini/settings.json (Gemini),
 * and Claude Desktop configuration. Auto-detects platform for global config paths.
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
