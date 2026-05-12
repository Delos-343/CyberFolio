insert into public.projects (
  "title",
  "slug",
  "summary",
  "description",
  "repoUrl",
  "liveUrl",
  "coverImage",
  "stack",
  "impact",
  "sortOrder",
  "featured",
  "visible"
)
values (
  'Neon Commerce Dashboard',
  'neon-commerce-dashboard',
  'Analytics-first storefront interface with conversion-focused product flows.',
  'A polished admin and storefront concept built around fast merchandising, KPI monitoring, and conversion-friendly UI patterns.',
  'https://github.com/yourname/neon-commerce-dashboard',
  'https://example.com',
  'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
  array['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
  'Improved readability and made the product story feel premium.',
  1,
  true,
  true
)
on conflict ("slug") do update set
  "title" = excluded."title",
  "summary" = excluded."summary",
  "description" = excluded."description",
  "repoUrl" = excluded."repoUrl",
  "liveUrl" = excluded."liveUrl",
  "coverImage" = excluded."coverImage",
  "stack" = excluded."stack",
  "impact" = excluded."impact",
  "sortOrder" = excluded."sortOrder",
  "featured" = excluded."featured",
  "visible" = excluded."visible",
  "updatedAt" = now();
