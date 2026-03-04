# App Check Setup (Abuse Protection)

**For AI Agents:** Configure reCAPTCHA key. Framework auto-enables App Check for all Firebase resources.

---

## 1. Environment Variables

**Vite:**
```bash
# .env
VITE_RECAPTCHA_SITE_KEY=6LcXXXX...         # reCAPTCHA v3 site key
VITE_APPCHECK_DEBUG_TOKEN=XXXX-XXXX-XXXX   # Optional: localhost testing
```

**Next.js:**
```bash
# .env.local
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcXXXX...
NEXT_PUBLIC_APPCHECK_DEBUG_TOKEN=XXXX-XXXX-XXXX
```

**Functions (.env):**
```bash
ENFORCE_APP_CHECK=false   # Set 'true' to reject requests without tokens
```

---

## 2. Get reCAPTCHA Enterprise Key

1. Go to [Google Cloud Console - reCAPTCHA](https://console.cloud.google.com/security/recaptcha)
2. Create key:
   - Platform: Website
   - Type: Score-based (checkbox optional)
   - Domains: `localhost`, `yourdomain.com`
3. Copy Site Key (starts with `6L...`)

> First 1M calls/month are free.

---

## 3. Enable in Firebase Console

1. [Firebase Console](https://console.firebase.google.com) → **App Check**
2. Click **Register app** → select your web app
3. Choose **reCAPTCHA v3**, paste Site Key
4. Save

---

## 4. Localhost Debug Token

reCAPTCHA doesn't work on localhost. Use debug tokens:

1. Start app in dev mode
2. Check console for: `App Check debug token: XXXXXXXX-XXXX-...`
3. Copy token
4. Firebase Console → App Check → **Manage debug tokens**
5. Add token with name (e.g., "Local Dev - John")
6. Add to `.env`:
   - Vite: `VITE_APPCHECK_DEBUG_TOKEN=XXXXXXXX-XXXX-...`
   - Next.js: `NEXT_PUBLIC_APPCHECK_DEBUG_TOKEN=XXXXXXXX-XXXX-...`

---

## 5. How It Works

**Automatic:**
- Framework detects `RECAPTCHA_SITE_KEY` env var
- Auto-initializes App Check during Firebase init
- All Firebase requests include tokens automatically
- No code changes needed

**Server-side:**
- Default: Logs warnings for missing tokens
- Set `ENFORCE_APP_CHECK=true` to reject invalid requests

---

## 6. Verification

**Console messages:**
| Message | Status |
|---------|--------|
| `[AppCheck] Enabled - all Firebase requests are protected` | Working |
| `[AppCheck] Not configured...` | Key missing (prod only) |
| `[AppCheck] Missing token for <operation>` | Server warning |

---

## 7. Rollout Strategy

1. **Monitor:** Deploy without enforcement, check logs
2. **Enforce:** Set `ENFORCE_APP_CHECK=true` when ready

---

## What App Check Protects

- Bot/script attacks
- Unauthorized API access
- Request replay attacks

**Does NOT replace:** Firebase Auth, Firestore Rules, Rate Limiting

---

**Files to configure:**
- `.env` or `.env.local` - Add reCAPTCHA key
- `functions/.env` - Optional enforcement
