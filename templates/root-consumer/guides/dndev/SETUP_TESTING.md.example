# Testing Guide

## Setup

```bash
bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### vitest.config.ts

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
});
```

### tests/setup.ts

```ts
import '@testing-library/jest-dom';
```

### package.json scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

---

## What To Test

### 1. Entity Tests

For each entity defined in `entities/`, test:

**CRUD operations:**
```ts
// tests/entities/Task.test.ts
import { describe, it, expect } from 'vitest';
import { TaskEntity } from '../../entities';

describe('TaskEntity', () => {
  it('has correct fields', () => {
    const fields = TaskEntity.fields;
    expect(fields).toHaveProperty('title');
    expect(fields).toHaveProperty('status');
    expect(fields.title.required).toBe(true);
  });

  it('has correct access rules', () => {
    const access = TaskEntity.access;
    expect(access.create).toContain('authenticated');
    expect(access.read).toContain('owner');
    expect(access.delete).toContain('admin');
  });
});
```

**What to verify per entity:**
- All required fields defined
- Field types match spec
- Access rules match spec (create/read/update/delete per role)
- State transitions valid (if entity has states)
- Default values set correctly

### 2. Page Render Tests

For each page in `src/pages/`, test that it mounts:

```tsx
// tests/pages/DashboardPage.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardPage from '../../src/pages/DashboardPage';

describe('DashboardPage', () => {
  it('renders without crashing', () => {
    render(<DashboardPage />);
    expect(document.body).toBeTruthy();
  });

  it('has correct PageMeta', () => {
    expect(DashboardPage.meta).toBeDefined();
    expect(DashboardPage.meta.title).toBeTruthy();
    expect(DashboardPage.meta.auth).toBe(true);
  });
});
```

**What to verify per page:**
- Page renders without error
- PageMeta is defined (title, auth requirement, admin flag)
- Route protection matches spec (public/auth/admin)

### 3. Access Control Tests

Derive from entity permissions in the spec:

```ts
// tests/access/access-rules.test.ts
import { describe, it, expect } from 'vitest';
import { entities } from '../../entities';

describe('Access Control', () => {
  it('admin entities require admin access', () => {
    // Entities marked admin-only in spec
    const adminEntities = ['AuditLog', 'SystemConfig'];
    for (const name of adminEntities) {
      const entity = entities[name];
      expect(entity.access.create).toContain('admin');
    }
  });

  it('user-owned entities have owner access', () => {
    // Entities where users own their own data
    const userEntities = ['Task', 'Profile'];
    for (const name of userEntities) {
      const entity = entities[name];
      expect(entity.access.update).toContain('owner');
    }
  });
});
```

### 4. Firestore Rules Tests

If using Firebase, generate rules from entity access definitions:

```
// firestore.rules — generated from entities
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // TaskEntity: create=authenticated, read=owner, update=owner, delete=admin
    match /tasks/{taskId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null && resource.data.userId == request.auth.uid;
      allow delete: if request.auth.token.admin == true;
    }
  }
}
```

---

## Test Generation Checklist

The Polisher agent should generate tests for everything in the spec:

| Source | Test Type | File |
|--------|-----------|------|
| Each entity | Field validation + access rules | `tests/entities/[Entity].test.ts` |
| Each page | Render + PageMeta | `tests/pages/[Page].test.tsx` |
| Spec permissions | Access control matrix | `tests/access/access-rules.test.ts` |
| Spec auth | Auth provider config | `tests/auth/auth.test.ts` |
| Entity access | Firestore rules | `firestore.rules` |

---

## Running Tests

```bash
bun test              # Run all tests once
bun test:watch        # Watch mode
bunx vitest --ui      # Visual UI
```

Tests should pass before calling `complete_phase({ files: [...test files...] })`.
