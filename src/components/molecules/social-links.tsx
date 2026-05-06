import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { site } from '@/lib/site';

export function SocialLinks() {
  const items = [
    { href: site.github, label: 'GitHub', icon: Github },
    { href: site.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: `mailto:${site.email}`, label: 'Email', icon: Mail },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {items.map(({ href, label, icon: Icon }) => (
        <Link key={label} href={href} target="_blank" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-100">
          <Icon className="h-4 w-4" /> {label}
        </Link>
      ))}
    </div>
  );
}
