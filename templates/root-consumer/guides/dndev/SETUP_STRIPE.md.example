# Stripe Setup Guide

## Prerequisites
- Stripe account (https://dashboard.stripe.com)
- `@donotdev/billing` installed

## 1. Get API Keys

1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (`pk_test_...`) → `.env`
3. Copy your **Secret key** (`sk_test_...`) → `supabase/functions/.env` or `functions/.env`

> **Security:** Never commit secret keys. Stripe also supports restricted keys (`rk_test_...`, `rk_live_...`) for tighter permissions.

## 2. Configure Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Set endpoint URL:
   - Supabase: `https://{{PROJECT_ID}}.supabase.co/functions/v1/stripe-webhook`
   - Firebase: `https://europe-west1-{{PROJECT_ID}}.cloudfunctions.net/stripeWebhook` (replace `europe-west1` with your region if different)
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** (`whsec_...`) → `supabase/functions/.env`

## 3. Environment Variables

### App `.env` (public)
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Functions `.env` (secret)
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 4. Test Clocks (Optional)

For subscription testing without waiting for real billing cycles:
1. Go to https://dashboard.stripe.com/test/test-clocks
2. Create a test clock
3. Create customers attached to the test clock
4. Advance time to trigger billing events

## 5. Verify

```bash
dndev setup          # Validates key formats + health check
dndev doctor         # Full health check for all providers
```

Check that:
- Publishable key format is valid
- Secret key format is valid
- Key modes match (both test or both live)
