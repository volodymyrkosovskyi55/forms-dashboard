# Forms Dashboard (Next.js 15)

Mini app for managing forms with role-based access, SSR list pages, validation and REST API route handlers.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- React Hook Form + Zod (shared schema)
- Zustand (auth + toasts)
- Supabase (Postgres)

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env.local
   ```
3. Add your Supabase project credentials:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Start app:
   ```bash
   npm run dev
   ```

## What is implemented

- Public landing page `/` (SSG) with metadata + OG/Twitter + `next/image`.
- Login page `/login` with email + role (`Individual`/`Admin`) saved in cookies and Zustand.
- Middleware protection for `/dashboard` and `/forms/*`.
- Forms list `/forms` rendered on server (SSR), filter by status, sorted by latest update.
- Admin CRUD:
  - `/forms/new`
  - `/forms/[id]`
  - POST/PUT/DELETE via route handlers
- Shared validation schema (`Zod`) used in both UI form and API.
- Loading and error UI for forms list.
- Basic accessible form fields (`label`, focus styles, inline errors).

## API

- `GET /api/forms`
- `GET /api/forms/:id`
- `POST /api/forms` (Admin only)
- `PUT /api/forms/:id` (Admin only)
- `DELETE /api/forms/:id` (Admin only)

## Notes

- First API read seeds 3 example records automatically into Supabase if table is empty.
- Role check is enforced in both UI and API.

### Supabase table schema

Create table `forms` with columns:
- `id` text primary key
- `title` text not null
- `description` text null
- `fields_count` int not null
- `status` text not null
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
