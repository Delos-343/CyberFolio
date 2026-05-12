import Link from 'next/link';
import { site } from '@/lib/site';
import { AnchorButton } from '@/components/atoms/button';

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/72 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="text-sm font-semibold uppercase tracking-tight text-white m-0 lg:ml-3">
          {site.nickname}
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
          <Link href="#about" className="transition hover:text-cyan-100">
            About
          </Link>
          <Link href="#skills" className="transition hover:text-cyan-100">
            Skills
          </Link>
          <Link href="#projects" className="transition hover:text-cyan-100">
            Projects
          </Link>
          <Link href="#contact" className="transition hover:text-cyan-100">
            Contact
          </Link>
        </nav>
        <AnchorButton href="/admin"> ◌ </AnchorButton>
      </div>
    </header>
  );
}
