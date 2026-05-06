# My CyberFolio

A modular Next.js portfolio with atomic design, slower centered reveal motion, GitHub-only admin access, and PostgreSQL-backed CRUD for up to 10 curated projects.

## Stack
- Next.js + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
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
3. Start PostgreSQL with Docker:
   ```bash
   docker compose up -d
   ```
4. Push Prisma schema and seed data:
   ```bash
   yarn db:push
   yarn seed
   ```
5. Start the app:
   ```bash
   yarn dev
   ```
