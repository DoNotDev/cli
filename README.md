# @donotdev/cli

Command-line interface for the DoNotDev Framework - scaffold projects, manage deployments, and maintain code quality.

## Installation

### Global Installation (Recommended for consumers)

```bash
npm install -g @donotdev/cli
# or
bun install -g @donotdev/cli
```

### Project-local Installation

```bash
npm install --save-dev @donotdev/cli
# or
bun add -d @donotdev/cli
```

## License

This package requires a DoNotDev Framework license. Applications will display a watermark without a valid license key.

**View pricing:** [donotdev.com/pricing](https://donotdev.com/pricing)
**Purchase license:** [donotdev.com/purchase](https://donotdev.com/purchase)

**Configure your license key:**

```bash
# In .env file (Vite projects)
VITE_DONOTDEV_LICENSE_KEY=dndev_your_key_here

# In .env file (Next.js projects)
NEXT_PUBLIC_DONOTDEV_LICENSE_KEY=dndev_your_key_here

# Or in code (before framework initialization)
globalThis.__DONOTDEV_LICENSE_KEY__ = 'dndev_your_key_here';
```

For detailed setup instructions, see [License Key Setup Guide](../../docs/guides/LICENSE_KEY_SETUP.md).

## Usage

```bash
dndev <command> [options]
```

## Commands

### `dndev init [name]`

Create a new DoNotDev project. Alias for `create-project`.

```bash
dndev init my-app
```

Scaffolds a complete project with:

- Monorepo structure (Turbo)
- Vite or Next.js apps
- Framework packages configured
- CLAUDE.md for AI-assisted development
- Ready-to-use auth, billing, i18n features

**Options:**

- Interactive prompts guide you through setup
- Choose Vite or Next.js
- Configure features (auth, billing, OAuth)
- Select deployment platform (Firebase, Vercel, both)

### `dndev create-project [name]`

Full form of `init`. Creates a new DoNotDev project.

```bash
dndev create-project my-saas-app
```

### `dndev create-app [name]`

Add a new app to an existing project.

```bash
cd my-project
dndev create-app admin-panel
```

**Options:**

- Choose app type (Vite or Next.js)
- Configure routing
- Set up i18n
- Enable features per app

### `dndev deploy`

Deploy your application to Firebase or Vercel.

```bash
dndev deploy
```

**Features:**

- Auto-detects deployment platform
- Validates service accounts (Firebase)
- Deploys functions and hosting
- Handles package.json dependencies
- Creates backups before deployment
- Rollback support on failure

**Options:**

- `--project <id>` - Specify Firebase project
- `--only functions` - Deploy only functions
- `--only hosting` - Deploy only hosting
- `--dry-run` - Show what would be deployed

### `dndev sync-secrets`

Sync environment variables from `.env` to Firebase Functions or Vercel.

```bash
dndev sync-secrets
```

**Features:**

- Parses `.env` files
- Filters public vars (VITE*\*, NEXT_PUBLIC*\*)
- Skips Firebase reserved prefixes
- Supports both Firebase and Vercel
- Cross-platform secret input

**Options:**

- `--env-file <path>` - Path to .env file (default: .env)
- `--platform <platform>` - Target platform: firebase or vercel
- `--project <id>` - Firebase project ID
- `--vercel-project <id>` - Vercel project ID
- `--dry-run` - Show what would be synced
- `--verbose` - Detailed output

**Examples:**

```bash
dndev sync-secrets --platform=firebase
dndev sync-secrets --env-file .env.production --project my-firebase-project
dndev sync-secrets --platform=vercel --vercel-project my-vercel-app
dndev sync-secrets --dry-run
```

### `dndev setup-cicd`

Set up CI/CD: detect providers, upload GitHub secrets, and generate GitHub Actions workflow YAML.

```bash
dndev setup-cicd
```

**Features:**

- Auto-detects providers (Firebase, Vercel, Supabase) from app config
- Collects all required secrets and uploads to GitHub
- Generates `ci.yml`, `deploy.yml`, and optionally `deploy-staging.yml`
- Handles service account files (base64-encoded)
- Reads secrets from `.dndev.secrets` (GH_PAT, VERCEL_TOKEN, etc.)
- Staging support via `.firebaserc` staging alias

**Options:**

- `--app <app>` - Target app (auto-detected if single app)
- `--staging` - Include staging workflow generation
- `--dry-run` - Preview secrets and YAML without uploading or writing

**Examples:**

```bash
dndev setup-cicd                # auto-detect app and providers
dndev setup-cicd --app web      # target specific app
dndev setup-cicd --dry-run      # preview only
```

### `dndev format [files]`

Format code using Prettier.

```bash
dndev format
dndev format src/**/*.ts
```

**Features:**

- Auto-formats code with Prettier
- Consistent code style

### `dndev clean`

Remove build artifacts and caches.

```bash
dndev clean
dndev clean --cache
dndev clean --all
```

**Options:**

- `--cache` - Also remove .turbo, .next, .vite caches
- `--all` - Also remove node_modules and lock files

**What gets cleaned:**

- Always: `dist/` directories
- `--cache`: `.turbo/`, `.next/`, `.vite/`, `tsconfig.tsbuildinfo`
- `--all`: `node_modules/`, lock files (package-lock.json, yarn.lock, bun.lockb)

## Programmatic Usage

You can also use CLI commands programmatically:

```typescript
import { createProject, createApp } from '@donotdev/cli';

await createProject('my-app', {
  type: 'vite',
  features: ['auth', 'billing'],
  deployment: 'firebase',
});

await createApp('admin-panel', {
  type: 'nextjs',
});
```

## Development Mode vs Consumer Mode

The CLI automatically detects execution context:

**Consumer Mode** (default when installed from npm):

- Creates projects in current directory
- Uses published @donotdev/\* packages
- Includes CLAUDE.md for AI assistance
- Standard npm dependency resolution

**Development Mode** (when run in dndev monorepo):

- Creates projects adjacent to monorepo
- Uses workspace:\* dependencies
- Links to local framework packages

## Architecture

```
packages/cli/
├── src/
│   ├── bin/
│   │   └── dndev.mjs          # CLI entry point
│   ├── commands/
│   │   ├── init.ts            # Alias for create-project
│   │   ├── create-project.ts  # Project scaffolding
│   │   ├── create-app.ts      # App creation
│   │   ├── deploy.ts          # Deployment automation
│   │   ├── sync-secrets.ts    # Secret management
│   │   ├── format.ts          # Code formatting
│   │   └── clean.ts           # Cleanup utilities
│   ├── utils/
│   │   ├── pathResolver.ts    # Cross-platform paths
│   │   ├── logger.ts          # Colored output
│   │   └── errors.ts          # Error handling
│   └── index.ts               # Programmatic API
├── templates/                 # Scaffolding templates
├── configs/                   # Bundled configs
└── package.json
```

## Requirements

- Node.js >= 18
- Bun >= 1.0 (recommended) or npm
- Git (for project initialization)

For deployment:

- Firebase CLI (for Firebase deployment)
- Vercel CLI (for Vercel deployment)

## License

MIT

## Links

- [DoNotDev Framework](https://donotdev.com)
- [Documentation](https://github.com/rodolpheapc/dndev/tree/main/docs)
- [GitHub](https://github.com/rodolpheapc/dndev)

---

Built by AMBROISE PARK Consulting
