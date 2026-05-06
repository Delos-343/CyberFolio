import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Label({ className, children, htmlFor }: { className?: string; children: ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn('mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-300', className)}>
      {children}
    </label>
  );
}
