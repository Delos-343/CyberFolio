import type { ReactNode } from 'react';
import { Nav } from '@/components/organisms/nav';
import { TopButton } from '@/components/organisms/top-button';

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_30%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.08),transparent_30%),linear-gradient(to_bottom,rgba(15,23,42,0.8),rgba(2,6,23,1))]" />
      <div className="relative z-10">
        <Nav />
        <main>{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-8 text-xs text-slate-400 md:px-6">
          Built with Next.js, Tailwind, Prisma, Docker, and native GitHub OAuth.
        </footer>
      </div>
      <TopButton />
    </div>
  );
}
