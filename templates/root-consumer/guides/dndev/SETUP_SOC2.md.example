# Setup: SOC2 Readiness

**DoNotDev auto-enforces SOC2 baseline controls.** Zero config needed for the MVP. This guide covers advanced controls and audit verification.

---

## Zero-Config Baseline (Always On)

When you wire `DndevSecurity` into your app, these controls activate automatically:

| Control | Default | SOC2 Criteria |
|---------|---------|---------------|
| Structured audit logging (all CRUD + auth) | ✅ Automatic | CC7.1 |
| Rate limiting (100 writes/min, 500 reads/min) | ✅ Automatic | CC6.6 |
| Brute-force lockout (5 attempts → 15 min) | ✅ Automatic | CC6.1 |
| Session timeout (8h idle) | ✅ Automatic | CC6.1 |
| Field-level RBAC + visibility | ✅ Always on (entity config) | CC6.3 |
| Supabase RLS / Firestore default-deny | ✅ By convention | CC6.3 |

---

## 1. Wire `DndevSecurity` (Required Once)

```typescript
// src/security.ts
import { DndevSecurity } from '@donotdev/security/server';

export const security = new DndevSecurity({
  // Optional: override defaults
  // rateLimit: { writesPerMin: 50, readsPerMin: 200 },
  // lockout: { maxAttempts: 3, lockoutMs: 30 * 60 * 1000 },
  // sessionTimeoutMs: 4 * 60 * 60 * 1000,

  // Required for PII encryption (see § PII Encryption below)
  // piiSecret: process.env.PII_SECRET,

  // Optional: send anomaly alerts to your SIEM/Slack
  // anomalyHandler: async (alert) => { await fetch(process.env.SIEM_WEBHOOK!, { method: 'POST', body: JSON.stringify(alert) }); },
});
```

```typescript
// src/main.ts (or app entry point)
import { security } from './security';
import { crudService } from './crud'; // your CrudService instance
import { auth } from './auth';        // your SupabaseAuth or FirebaseSDK instance

crudService.setSecurity(security);
auth.setSecurity(security);
```

---

## 2. PII Encryption (Opt-In — C1 Confidentiality)

Required only for entities storing personal data (email, phone, SSN, health data, etc.).

```typescript
// entities/user.ts
export const userEntity = defineEntity({
  name: 'User',
  collection: 'users',
  security: {
    piiFields: ['email', 'phone', 'dateOfBirth'], // Encrypted at rest with AES-256-GCM
  },
  fields: { /* ... */ },
});
```

```bash
# Add to .env (min 32 chars, generate with: openssl rand -hex 32)
PII_SECRET=your-secret-key-min-32-chars-here
```

Pass to security:
```typescript
export const security = new DndevSecurity({
  piiSecret: process.env.PII_SECRET,
});
```

---

## 3. MFA Enforcement (Opt-In — CC6.1)

Enforce MFA for specific roles on sensitive entities:

```typescript
export const paymentEntity = defineEntity({
  name: 'Payment',
  collection: 'payments',
  security: {
    requireMfa: 'admin', // 'admin' | 'manager' | 'user'
  },
  fields: { /* ... */ },
});
```

Enable MFA in your provider:
- **Supabase:** Dashboard → Auth → Multi Factor Authentication → Enable TOTP
- **Firebase:** Firebase Console → Authentication → Multi-factor Auth → Enable

---

## 4. Data Retention (Opt-In — P6 Privacy)

```typescript
export const auditLogEntity = defineEntity({
  name: 'AuditLog',
  collection: 'audit_logs',
  security: {
    retention: { days: 365 }, // Auto-flag records for purge after 1 year
  },
  fields: { /* ... */ },
});
```

Run retention purge (e.g., in a scheduled Cloud Function):
```typescript
import { privacyManager } from '@donotdev/security/server';
// privacyManager.shouldPurge(record.createdAt, retentionDays) → boolean
```

---

## 5. Right to Erasure (GDPR Art. 17 / P8)

```typescript
import { DndevSecurity } from '@donotdev/security/server';

// In your account deletion handler:
await security.privacyManager.eraseUser(userId, async (uid) => {
  // Your custom erasure logic per collection
  await db.from('orders').update({ userId: null }).eq('userId', uid);
  await db.from('profiles').delete().eq('id', uid);
});
```

---

## 6. Health Monitoring (Opt-In — A1 Availability)

```typescript
// src/client/health.ts
import { HealthMonitor } from '@donotdev/security';

const dbMonitor = new HealthMonitor({ failureThreshold: 3, successThreshold: 2, timeoutMs: 5000 });

// Wrap all downstream DB calls through the circuit breaker
export const safeQuery = (fn: () => Promise<unknown>) => dbMonitor.protect(fn);

// Expose a health endpoint (Next.js example)
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: dbMonitor.checkLiveness() });
}
```

---

## 7. Anomaly Detection (Opt-In — CC7.2)

Triggered automatically when brute-force or bulk-delete thresholds are exceeded. Wire a handler to send alerts:

```typescript
export const security = new DndevSecurity({
  anomalyHandler: async (alert) => {
    // Send to Slack, PagerDuty, Datadog, etc.
    await fetch(process.env.SLACK_WEBHOOK!, {
      method: 'POST',
      body: JSON.stringify({ text: `🚨 SOC2 Anomaly: ${alert.type} — ${alert.details}` }),
    });
  },
});
```

---

## 8. Audit Log Output

Audit events write to `process.stdout` as NDJSON — pipe to your SIEM:

```json
{"timestamp":"2025-01-15T10:23:00.000Z","type":"crud.create","userId":"u_123","resource":"products","resourceId":"p_456","ip":"192.168.1.1"}
{"timestamp":"2025-01-15T10:23:01.000Z","type":"auth.login.failure","userId":"unknown","resource":"auth","ip":"10.0.0.5","details":"brute_force_lockout"}
```

**Cloud Logging (Firebase / GCP):** Stdout is captured automatically.
**Datadog:** Set `DD_LOGS_INJECTION=true` and pipe stdout to the Datadog agent.
**Supabase:** Export `process.stderr` anomaly alerts to Logflare.

---

## SOC2 Readiness Check

Run before any audit:

```bash
dn soc2                    # Scan current app
dn soc2 --app my-app       # Scan specific app
dn soc2 --json             # Machine-readable JSON output (CI/CD)
dn soc2 --verbose          # Show details for passing checks too
```

**Exit codes:** `0` = all checks pass, `1` = one or more checks failed (CI-friendly).

**Checks run:**

| Check | Criteria | What It Looks For |
|-------|----------|--------------------|
| SecurityContext wired | CC6.1 | `DndevSecurity` in source |
| PII encryption secret | C1 | `PII_SECRET` in env when `piiFields` defined |
| Firestore default-deny | CC6.3 | `allow read, write: if false` in `firestore.rules` |
| Supabase RLS | CC6.3 | `ENABLE ROW LEVEL SECURITY` in SQL migrations |
| Audit logging | CC7.1 | `.audit()` / `AuditLogger` usage |
| Rate limiting | CC6.6 | `rateLimit` / `DndevRateLimiter` usage |
| Retention policies | P6 | `retention.days` in entity config |
| Health monitoring | A1 | `HealthMonitor` or `/api/health` endpoint |
| MFA enforcement | CC6.1 | `requireMfa` in sensitive entities |

---

## Coverage After Full Setup

| SOC2 Criteria | Control | Status |
|---------------|---------|--------|
| CC6.1 Auth hardening | Lockout + session timeout + MFA | Framework-enforced |
| CC6.3 Authorization | RBAC + field visibility + RLS/Firestore rules | Framework-enforced |
| CC6.6 Rate limiting | Per-user sliding window | Framework-enforced |
| CC7.1 Audit logging | All CRUD + auth events as NDJSON | Framework-enforced |
| CC7.2 Anomaly detection | Auth failures + bulk ops threshold alerts | Opt-in handler |
| A1 Availability | Circuit breaker + liveness probes | Opt-in `HealthMonitor` |
| C1 Confidentiality | AES-256-GCM field encryption | Opt-in `piiFields` |
| P1–P8 Privacy | Retention policies + right-to-erasure | Opt-in `retention` |
