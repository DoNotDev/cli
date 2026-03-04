# Setup: OAuth (Third-Party Connections)

**Most is pre-configured.** Connect to Spotify, LinkedIn, GitHub, etc. for API access. Add env vars. Framework handles OAuth flows, token exchange, refresh.

---

## Standard Use

**Environment:**
```bash
# .env
VITE_OAUTH_PARTNERS=github,google,spotify,discord
VITE_OAUTH_GITHUB_CLIENT_ID=your_github_client_id
VITE_OAUTH_GOOGLE_CLIENT_ID=your_google_client_id
VITE_OAUTH_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_OAUTH_DISCORD_CLIENT_ID=your_discord_client_id
```

**Available:** `github`, `google`, `spotify`, `discord`, `twitch`, `reddit`, `linkedin`, `slack`, `notion`, `medium`, `twitter`, `mastodon`, `youtube`

**OAuth Provider Dashboard:** Create OAuth apps, copy Client IDs, configure redirect URIs.

---

## Advanced: Components & Hooks

```tsx
import { useOAuth } from '@donotdev/oauth';
import { MultipleOAuthProviders, OAuthPartnerButton } from '@donotdev/oauth';
import { OAuthConnectionModal } from '@donotdev/oauth';

// Hook
const connect = useOAuth('connect');
const disconnect = useOAuth('disconnect');
const isConnected = useOAuth('isConnected');
const loading = useOAuth('loading');
const error = useOAuth('error');

await connect('github', 'api-access');  // Purpose: 'authentication' | 'api-access'
await disconnect('github');
const connected = isConnected('github');

// Components
<MultipleOAuthProviders purpose="api-access" layout="vertical" />
<OAuthPartnerButton partnerId="github" purpose="api-access" />
<OAuthConnectionModal />
```

**Pre-configured:** Auto-discovers enabled providers, handles PKCE flow, token refresh, callbacks.

---

**Add env vars, get OAuth. Framework handles the rest.**
