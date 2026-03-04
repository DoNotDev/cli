# Cookie Reference Guide

**For Framework Consumers: GDPR Compliance**

---

## Overview

This guide maps DoNotDev framework features to the cookies they set, helping you configure your cookie consent banner and privacy policy correctly.

---

## Cookie Categories (GDPR)

- **Necessary** - Essential for service to function (no consent required per GDPR Article 6(1)(f))
- **Functional** - Enhances experience (requires consent per GDPR Article 6(1)(a))
- **Analytics** - Usage tracking (requires consent)
- **Marketing** - Advertising/tracking (requires consent)

---

## Feature Cookie Mapping

### Authentication (`@donotdev/auth`)

**Provider: Firebase Authentication**

| Cookie Name | Category | Purpose | Expires |
|------------|----------|---------|---------|
| `__session` | Necessary | Session authentication token | Session |
| `__Secure-*` | Necessary | Security tokens (HTTPS only) | Varies |

**GDPR Status:** Necessary - Authentication is essential for account-based services.

**Environment Variables:**
```bash
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_PROJECT_ID=your-project
```

---

### OAuth (`@donotdev/oauth`)

**Providers: Google, GitHub OAuth**

| Cookie Name | Category | Purpose | Expires |
|------------|----------|---------|---------|
| OAuth state cookies | Necessary | CSRF protection during OAuth flow | Session |
| Provider session cookies | Necessary | Maintain OAuth session | Per provider |

**GDPR Status:** Necessary - Part of authentication flow.

**Environment Variables:**
```bash
VITE_AUTH_PARTNERS=google,github
```

**Third-party cookies set by OAuth providers:**
- **Google:** `SID`, `HSID`, `SSID`, `APISID`, `SAPISID` (necessary for OAuth)
- **GitHub:** `user_session`, `logged_in` (necessary for OAuth)

---

### Billing (`@donotdev/billing`)

**Provider: Stripe**

| Cookie Name | Category | Purpose | Expires |
|------------|----------|---------|---------|
| `__stripe_mid` | Necessary | Fraud prevention | 1 year |
| `__stripe_sid` | Necessary | Checkout session | 30 minutes |

**GDPR Status:** Necessary - Required for payment processing and fraud prevention.

**Environment Variables:**
```bash
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx
```

**Stripe Privacy:** Stripe sets these cookies when Checkout or Customer Portal is opened. They're classified as necessary for PCI compliance and fraud prevention.

---

### Framework Core Cookies

**Set by `@donotdev/core`**

| Cookie Name | Category | Purpose | Expires |
|------------|----------|---------|---------|
| `dndev-cookie-consent` | Necessary | Stores user's cookie preferences | 365 days |
| `dndev-theme` | Necessary | Remembers dark/light mode preference | 365 days |
| `dndev-lang` | Necessary | Remembers language preference | 365 days |

**GDPR Status:** Necessary (essential for UX, no tracking, purely local preferences)

---

## Analytics & Marketing (Optional)

These are NOT included in the framework but commonly added by consumers:

### Google Analytics

| Cookie Name | Category | Purpose | Expires |
|------------|----------|---------|---------|
| `_ga` | Analytics | Distinguish users | 2 years |
| `_gid` | Analytics | Distinguish users | 24 hours |
| `_gat` | Analytics | Throttle requests | 1 minute |

**GDPR Status:** Analytics - Requires explicit consent.

**Setup:** Consumer must add Google Analytics script and obtain consent.

### Facebook Pixel

| Cookie Name | Category | Purpose | Expires |
|------------|----------|---------|---------|
| `_fbp` | Marketing | Track conversions | 90 days |

**GDPR Status:** Marketing - Requires explicit consent.

---

## Cookie Banner Configuration

### Minimal Setup (Auth + Billing + Theme/Lang)

If your app only uses auth, billing, theme, and language preferences, all cookies are **necessary**:

```typescript
// src/config/app.ts
export const appConfig: AppConfig = {
  features: {
    // No config needed - all framework cookies are necessary
  },
};
```

**Result:** No cookie banner shown - all cookies are GDPR-compliant without consent.

### With Analytics/Marketing

If you add Google Analytics or marketing pixels:

```typescript
// src/config/app.ts
export const appConfig: AppConfig = {
  features: {
    requiredCookies: ['necessary', 'functional', 'analytics'],
  },
};
```

**Result:** Cookie banner shows all categories, users must consent to analytics.

---

## Privacy Policy Template

**Example text for your privacy policy:**

```markdown
## Cookies We Use

### Essential Cookies (Always Active)

We use essential cookies that are necessary for our service to function:

- **Authentication** (Firebase): Maintains your login session
- **Payment Processing** (Stripe): Enables secure payments and fraud prevention
- **Cookie Preferences**: Remembers your cookie consent choices

These cookies are essential and cannot be disabled.

### Functional Cookies (Optional)

With your consent, we use functional cookies to enhance your experience:

- **Theme Preference**: Remembers your dark/light mode choice
- **Language Preference**: Remembers your selected language

You can disable these in cookie settings.

### Analytics Cookies (Optional) [If applicable]

With your consent, we use Google Analytics to understand how visitors use our site.
This helps us improve the user experience.

You can disable these in cookie settings.
```

---

## Testing Cookie Compliance

### Check What Cookies Are Set

```javascript
// Browser console
document.cookie
```

### Verify Consent Before Analytics

```typescript
import { useConsent } from '@donotdev/core';

function MyAnalytics() {
  const hasAnalyticsConsent = useConsent('hasCategory')('analytics');

  useEffect(() => {
    if (hasAnalyticsConsent) {
      // Initialize Google Analytics
    }
  }, [hasAnalyticsConsent]);
}
```

---

## GDPR Compliance Checklist

- [ ] List all cookies in privacy policy with categories
- [ ] Only set analytics/marketing cookies after consent
- [ ] Provide cookie settings link in footer
- [ ] Allow users to withdraw consent
- [ ] Store consent for 12 months maximum
- [ ] Don't block essential features if functional cookies declined

**Framework handles:** Consent storage, banner UI, category management

**You handle:** Privacy policy text, analytics integration, marketing pixels

---

## Quick Reference

| Feature | Cookies | Category | Consent Required? |
|---------|---------|----------|-------------------|
| Auth | `__session`, `__Secure-*` | Necessary | No |
| OAuth | Provider session cookies | Necessary | No |
| Billing | `__stripe_mid`, `__stripe_sid` | Necessary | No |
| Theme | `dndev-theme` | Necessary | No |
| Language | `dndev-lang` | Necessary | No |
| Consent | `dndev-cookie-consent` | Necessary | No |
| Analytics | `_ga`, `_gid` | Analytics | Yes |
| Marketing | `_fbp`, etc. | Marketing | Yes |

---

**Need help?** Check your browser DevTools → Application → Cookies to see exactly what's being set.
