-- Required for gen_random_uuid()
create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  "title" text not null,
  "slug" text not null unique,
  "summary" text not null,
  "description" text not null,
  "repoUrl" text not null,
  "liveUrl" text,
  "coverImage" text,
  "stack" text[] not null default '{}'::text[],
  "impact" text,
  "sortOrder" integer not null default 0,
  "featured" boolean not null default false,
  "visible" boolean not null default true,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create index if not exists projects_visible_sort_order_idx
  on public.projects ("visible", "sortOrder");

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new."updatedAt" = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();
