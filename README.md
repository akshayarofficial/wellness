# Everyday Mental Wellness

Public website, registration flow and admin panel for the Everyday Mental Wellness program.

- **App**: Next.js (`src/app`)
- **Database & auth**: Supabase (Postgres + Supabase Auth)
- **Admin panel**: `/admin`, where admins sign in with email and password

Requires **Node.js 22.13+**.

## Setup

### 1. Environment

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` from **Supabase Dashboard → Project Settings → API**:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role / secret key (server-only, never commit) |

### 2. Database

Apply [`supabase/migrations/20260930120000_registrations_and_admins.sql`](supabase/migrations/20260930120000_registrations_and_admins.sql) in one of two ways:

- **SQL Editor**: paste the file into Supabase Dashboard → SQL Editor and run it, or
- **Supabase CLI**: `supabase link --project-ref <ref>` then `supabase db push`

### 3. First admin

```bash
npm run admin:create -- you@example.com   # prompts for a password (min 10 chars)
```

This creates the Supabase Auth user (pre-confirmed) and adds it to `public.admins`. Running it again for an existing email resets that user's password.

### 4. Run

```bash
npm run dev
```

- Registration form: http://localhost:3000/register
- Admin panel: http://localhost:3000/admin

## How it fits together

```
Browser ──> Next.js
             ├─ /register ──> POST /api/register ──(service role)──> register_participant()
             ├─ GET /api/groups ──────────────────(service role)──> group_registration_counts()
             └─ /admin/* ──(admin's session, RLS)──> admin_list_registrations(), admin_registration_stats()
```

### Security model

- **Public visitors** have no direct database access. Registrations go through the Next.js route handler, which validates input and calls `register_participant()` with the service-role key.
- **Admins** sign in with Supabase Auth. Row-level security allows reading `registrations` only when the user has a row in `public.admins`. Nobody gets insert, update or delete through the API.
- `register_participant()` takes an advisory lock per group and time slot, so concurrent sign-ups never get the same seat (rooms of 6).
- `src/proxy.js` refreshes the auth session and redirects signed-out visitors away from `/admin/*`. Access is actually enforced by the database.

### Key files

| Path | Purpose |
|---|---|
| `supabase/migrations/` | Tables, RLS policies, database functions |
| `src/lib/supabase/client.js` | Browser Supabase client (admin panel) |
| `src/lib/supabase/service.js` | Server-only service-role client (route handlers) |
| `src/lib/programs.js` | Program groups, time slots, participation styles |
| `src/lib/registrationValidation.js` | Registration input validation |
| `src/app/api/register`, `src/app/api/groups` | Public API route handlers |
| `src/app/admin/` | Admin panel UI |
| `scripts/create-admin.mjs` | Create an admin or reset their password |

### Managing admins

- **Add**: `npm run admin:create -- email@example.com`
- **Remove access**: delete their row from `public.admins`, or delete the user under Authentication → Users.
- **Disable public sign-ups**: turn off "Allow new users to sign up" under Authentication → Sign In / Providers. Admin accounts are created with the script, and a signed-up non-admin can't see any data anyway.
