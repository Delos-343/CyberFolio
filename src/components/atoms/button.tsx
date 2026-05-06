import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(base, 'bg-cyan-400 text-slate-950 hover:scale-[1.01] hover:shadow-neon', className)} {...props} />;
}

export function GhostButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(base, 'border border-cyan-300/30 bg-white/5 text-cyan-100 hover:border-cyan-300/60 hover:bg-white/10', className)} {...props} />;
}

export function AnchorButton({ className, href, children, ...props }: { className?: string; href: string; children: ReactNode; target?: string; rel?: string }) {
  return (
    <Link href={href} className={cn(base, 'border border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-100 hover:border-fuchsia-300/60 hover:bg-fuchsia-500/20', className)} {...props}>
      {children}
    </Link>
  );
}
