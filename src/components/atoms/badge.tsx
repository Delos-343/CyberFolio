import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center text-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-100', className)}>
      {children}
    </span>
  );
}
