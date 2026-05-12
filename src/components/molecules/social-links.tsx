import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { site } from '@/lib/site';

export function SocialLinks() {
  const items = [
    { href: site.github, label: 'GitHub', icon: Github },
    { href: site.linkedin, label: 'LinkedIn', icon: Linkedin },
  ];

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      {items.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          className="flex w-full flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-100"
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}
