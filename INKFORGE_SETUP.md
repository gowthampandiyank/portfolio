# InkForge//Street setup

## 1. Install

```bash
npm install
npm run dev
```

## 2. Environment

Create `.env.local`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Never expose `STRIPE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in Vite/client code.

## 3. Supabase

Run `supabase/migrations/001_comic_store.sql` in the Supabase SQL editor or through the Supabase CLI. The migration creates the schema, RLS policies, the `product-art` storage bucket, a signup profile trigger, categories, sample products and variants.

Promote an account to admin only from a trusted SQL session:

```sql
update public.profiles set role='admin' where email='YOUR_ADMIN_EMAIL';
```

## 4. Stripe

Deploy `supabase/functions/create-checkout-session/index.ts` and set these Edge Function secrets:

```bash
supabase secrets set STRIPE_SECRET_KEY=...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
supabase secrets set SITE_URL=https://your-domain.example
```

The browser should invoke the function with the authenticated Supabase session. Keep Stripe secret material server-side.

## 5. Artwork/IP

The seeded products intentionally use original anime-inspired and superhero-inspired concepts. Replace the placeholder artwork with original or properly licensed assets via the admin image manager. Do not upload unlicensed franchise character art.

## Architecture

- React 18 + Vite + TypeScript
- Tailwind CSS design tokens
- Framer Motion for micro-interactions
- Lucide React icons
- Zustand persisted cart/auth state
- Supabase Auth + Postgres + RLS + Storage
- Stripe Checkout through a Supabase Edge Function

The current branch is `feat/comic-streetwear-store` and is based on `main`.
