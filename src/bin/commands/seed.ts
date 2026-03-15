// packages/cli/src/bin/commands/seed.ts
/**
 * @fileoverview Seed Command
 * @description Generate and insert sample data into the project database.
 * Auto-detects provider (Supabase/Firebase), loads entity definitions,
 * generates realistic data, and writes via the shared DbContext.
 *
 * Usage:
 *   dndev seed              — seed all entities (10 rows each)
 *   dndev seed -n 50        — seed 50 rows per entity
 *   dndev seed --clean      — truncate tables before seeding
 *   dndev seed --only products,users — seed specific entities only
 *   dndev seed --seed 123   — reproducible output with fixed random seed
 *
 * @version 0.1.0
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

export { seed as main } from '@donotdev/tooling';
