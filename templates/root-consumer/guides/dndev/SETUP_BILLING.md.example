# Setup: Billing

**Most is pre-configured.** Create Stripe config files. Framework handles checkout, webhooks, subscriptions, and loading UX.

---

## Standard Use

**Environment:**
```bash
# apps/<app>/.env (frontend, public)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# .dndev.secrets (project root, gitignored)
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx  # From 'stripe listen' or Stripe Dashboard → Webhooks
```

**Stripe Dashboard:** Create products, copy Price IDs (`price_...`)

---

## Automatic UX (Zero Config)

**The hook handles loading overlays automatically for redirect operations:**

```tsx
// Just call the method - framework handles the rest
const checkout = useStripeBilling('checkout', authState);
const openCustomerPortal = useStripeBilling('openCustomerPortal', authState);

// Checkout → Shows "Redirecting to Stripe" / "Initializing secure payment..."
await checkout({ priceId: 'price_123', mode: 'payment' });

// Portal → Shows "Redirecting to Stripe" / "Opening billing portal..."
await openCustomerPortal();
```

**What happens automatically:**
- Blocking fullscreen overlay during Firebase Functions cold start
- Operation-specific messaging (checkout vs portal)
- Translated in all 8 supported languages
- Clean removal on redirect or error

**Optional:** Use `loading` state if you want to disable your own buttons:
```tsx
const loading = useStripeBilling('loading', authState);
<Button disabled={loading}>Purchase</Button>
```

---

## Advanced: Frontend Config

```typescript
// src/config/stripeFrontConfig.ts
export const stripeFrontConfig: StripeFrontConfig = {
  pro_plan: {
    name: 'Pro Plan',
    price: 29,
    currency: 'USD',
    priceId: 'price_1234567890',
    allowPromotionCodes: true,
  },
};
```

---

## Advanced: Backend Config

```typescript
// functions/src/config/stripeBackConfig.ts
export const stripeBackConfig: StripeBackConfig = {
  pro_plan: {
    type: 'StripeSubscription', // or 'StripePayment'
    price: 2900, // In cents
    priceId: process.env.STRIPE_PRICE_PRO_PLAN!,
    tier: 'pro',
    onPurchaseSuccess: async (userId, metadata) => { /* Grant features */ },
  },
};

// functions/src/index.ts
import { createCheckoutSession } from '@donotdev/functions/firebase';
export const createCheckout = createCheckoutSession(stripeBackConfig);
```

---

## Advanced: Components & Hooks

```tsx
import { useStripeBilling } from '@donotdev/billing';
import { SubscriptionTemplate, PaymentTemplate } from '@donotdev/templates';
import { ProductCard, SubscriptionManager } from '@donotdev/billing';

// Auth state required
const user = useAuth('user');
const status = useAuth('status');
const authState = { user, status };

// Methods - framework handles overlay automatically
const checkout = useStripeBilling('checkout', authState);
const openCustomerPortal = useStripeBilling('openCustomerPortal', authState);

// Optional state access
const loading = useStripeBilling('loading', authState);
const error = useStripeBilling('error', authState);
```

---

**Create config files, get billing with best-in-class UX. Framework handles the rest.**
