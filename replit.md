# Portfolio Builder Pro

## Overview
A React + Vite + TypeScript single-page application for building professional portfolios. Uses Supabase as the backend/database and Tailwind CSS with shadcn/ui components for styling.

## Tech Stack
- **Frontend:** React 18, TypeScript, Vite
- **UI:** Tailwind CSS, shadcn/ui (Radix UI), Framer Motion
- **Backend/DB:** Supabase (PostgreSQL, Auth, Storage)
- **State Management:** TanStack React Query
- **Routing:** React Router DOM v6
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest, Playwright

## Project Structure
- `src/` - Main source code
  - `components/` - Reusable UI components
  - `pages/` - Route-level page components
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions
  - `integrations/` - Third-party integrations (Supabase client)
  - `test/` - Test files
- `public/` - Static assets
- `supabase/` - Supabase configuration/migrations

## Environment Variables
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon/public key
- `VITE_SUPABASE_PROJECT_ID` - Supabase project ID

## Development
- **Dev server:** `npm run dev` (runs on port 5000)
- **Build:** `npm run build`
- **Test:** `npm test`

## Deployment
Configured as a static site deployment:
- Build command: `npm run build`
- Output directory: `dist`

## Replit Configuration
- Vite dev server runs on `0.0.0.0:5000` with `allowedHosts: true` for proxy compatibility
- Workflow: "Start application" → `npm run dev`
