# Everyday Mental Wellness

Public website plus registration backend and admin panel for the Everyday Mental Wellness program.

- **Frontend**: Next.js (`src/app`) on port 3000
- **Backend**: Express + SQLite (`server/`) on port 5000, reached by the browser only through Next.js
- **Admin panel**: `/admin`, where admins sign in with a username and password

Requires **Node.js 22.13+** (uses the built-in `node:sqlite` module).

## Getting started

```bash
npm install

# 1. Create the first admin account (prompts for a password, min 10 chars)
npm run admin:create -- admin

# 2. Start the API (use server:dev for auto-restart on changes)
npm run server

# 3. In another terminal, start the website
npm run dev
```

- Public registration form: http://localhost:3000/register
- Admin panel: http://localhost:3000/admin

Running `npm run admin:create -- <username>` for an existing username resets that admin's password and signs out all of their sessions. For non-interactive use, set `ADMIN_PASSWORD=...` in the environment.

## How it fits together

```
Browser ──> Next.js :3000
              ├─ /register, /admin/*                 pages
              ├─ /api/register, /api/groups          route handlers → Express
              └─ /api/admin/*                        rewrite → Express
Express :5000 ──> server/data/wellness.db (SQLite)
```

| Path | Purpose |
|---|---|
| `server/index.js` | App bootstrap, middleware, error handling |
| `server/db.js` | SQLite connection and schema migrations |
| `server/lib/registrations.js` | Registration create/list/search, seat allocation |
| `server/lib/auth.js` | Admin users (scrypt password hashes) and sessions |
| `server/routes/public.js` | `GET /api/health`, `GET /api/groups`, `POST /api/register` |
| `server/routes/admin.js` | `POST /api/admin/login`, `POST /api/admin/logout`, `GET /api/admin/me`, `GET /api/admin/registrations` (+ `/stats`, `/export`, `/:id`) |
| `server/scripts/create-admin.js` | Create an admin or reset their password |
| `src/app/admin/` | Admin panel UI |
| `src/proxy.js` | Redirects `/admin/*` to the login page when there is no session cookie |

### Admin authentication

- Passwords are hashed with scrypt. Sessions are random tokens in an `HttpOnly`, `SameSite=Strict` cookie, and only a SHA-256 hash of each token is stored in the database.
- Sessions expire after 12 hours by default (`ADMIN_SESSION_TTL_HOURS`).
- After 5 failed logins from one IP, that IP must wait 15 minutes before trying again.
- Every `/api/admin/*` endpoint except login and logout needs a valid session. The Next.js proxy check is only a UX redirect; access is actually enforced in Express.

### Data

- The database lives at `server/data/wellness.db`, which is git-ignored. **Back this file up**, since it holds all registrations.
- If an old `server/data/registrations.json` exists, it is imported automatically on first start and renamed to `registrations.json.imported-<timestamp>`.

## Configuration

Copy `server/.env.example` to `server/.env` to override defaults (port, host, session length, login throttling). For production, set `NODE_ENV=production` so the session cookie is only sent over HTTPS.

On the Next.js side, `EXPRESS_ORIGIN` (used by rewrites at build time) and `EXPRESS_API_URL` (used by the route handlers) point to the API when it isn't at `http://127.0.0.1:5000`.
