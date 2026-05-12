# My CyberFolio

A modular Next.js portfolio with atomic design, slower centered reveal motion, GitHub-only admin access, and Supabase-backed CRUD for curated projects.

## Stack
- Next.js + TypeScript
- Tailwind CSS
- Supabase Postgres
- NextAuth GitHub OAuth

## What is included
- Lean public bundle and deployment footprint, with fewer client-side dependencies on public pages
- Scroll-triggered reveal animations that activate around the middle of each section
- Floating back-to-top button
- Admin login restricted to your GitHub account only
- Create / edit / delete project CRUD
- Maximum of 10 projects enforced in the UI and API
- Atomic design structure: atoms, molecules, organisms, templates

## Setup
1. Install dependencies
   ```bash
   yarn
   ```
2. Copy `.env.example` to `.env.local` and fill in your values.
3. In Supabase, create the `projects` table using `supabase/schema.sql`.
4. Optionally seed sample data from `supabase/seed.sql`.
5. Start the app:
   ```bash
   yarn dev
   ```

## Supabase variables
- `SUPABASE_URL` — your project URL
- `SUPABASE_SERVICE_ROLE_KEY` — server-only key used by the app for project CRUD

## Notes
- Prisma has been fully removed from this version.
- Project data is fetched directly from Supabase's PostgREST API.
