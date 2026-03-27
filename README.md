# Forms Dashboard

Small Next.js app for managing forms with role-based access and basic CRUD.

## Live Demo

- [https://forms-dashboard-two.vercel.app/](https://forms-dashboard-two.vercel.app/)

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Zustand
- Route Handlers (`/api/*`)
- Supabase (Postgres)

## What I built

- Public landing page `/` (SSG) with metadata, OG/Twitter tags, and `next/image`
- Login page `/login` (email + role select: Individual/Admin)
- Cookie-based route protection via middleware for `/dashboard` and `/forms/*`
- SSR forms list page with:
  - status filter (`draft`, `active`, `archived`)
  - latest-first sorting by `updatedAt`
  - loading state + fallback state
- Admin-only CRUD:
  - `POST /api/forms`
  - `PUT /api/forms/:id`
  - `DELETE /api/forms/:id`
- Shared validation schema (same Zod schema on client and server)
- Toast notifications via Zustand

## Local Setup

1. Install packages:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env.local
   ```
3. Add credentials in `.env.local`:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Run:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/forms`
- `GET /api/forms/:id`
- `POST /api/forms` (Admin only)
- `PUT /api/forms/:id` (Admin only)
- `DELETE /api/forms/:id` (Admin only)

## Notes

- If the forms table is empty, the app seeds 3 records on first API request.
- Role checks are enforced in both UI and API handlers.

### Supabase table (`forms`)

- `id` text primary key
- `title` text not null
- `description` text null
- `fields_count` int not null
- `status` text not null
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
