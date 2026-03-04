# OAuth Provider Setup Guide

Each OAuth provider requires manual registration in their developer console.
`dndev coach` shows the correct redirect URI and setup steps for each provider.

## Redirect URIs

### Firebase
```
https://{{PROJECT_ID}}.firebaseapp.com/__/auth/handler
```
> If you use a custom auth domain, replace `{{PROJECT_ID}}.firebaseapp.com` with your custom domain.

### Supabase
```
https://{{PROJECT_ID}}.supabase.co/auth/v1/callback
```

---

## Google OAuth

1. Go to https://console.cloud.google.com/apis/credentials
2. Create **OAuth 2.0 Client ID** (type: Web application)
3. Add **Authorized redirect URI** (see above)
4. Copy **Client ID** and **Client Secret**
5. Enable in your backend:
   - Firebase: Console > Authentication > Sign-in method > Google
   - Supabase: Dashboard > Authentication > Providers > Google

## GitHub OAuth

1. Go to https://github.com/settings/developers
2. Click **New OAuth App**
3. Set **Authorization callback URL** (see redirect URI above)
4. Copy **Client ID** and **Client Secret**
5. Enable in your backend:
   - Firebase: Console > Authentication > Sign-in method > GitHub
   - Supabase: Dashboard > Authentication > Providers > GitHub

## Apple Sign In

1. Go to https://developer.apple.com/account/resources/identifiers/list/serviceId
2. Create a **Services ID**
3. Enable **Sign In with Apple**
4. Add **Redirect URL** (see above)
5. Create a **Key** for Sign In with Apple
6. Enable in your backend:
   - Firebase: Console > Authentication > Sign-in method > Apple
   - Supabase: Dashboard > Authentication > Providers > Apple

> **Note:** Apple requires an Apple Developer Program membership ($99/year).

## Verify

```bash
dndev doctor
```

Check that auth providers are detected and backend configuration is referenced.
