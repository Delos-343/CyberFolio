import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function SkillPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-slate-200 backdrop-blur-xl sm:w-auto',
        className
      )}
    >
      {children}
    </span>
  );
}
