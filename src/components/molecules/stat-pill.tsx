import type { ReactNode } from 'react';

export function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <div className="text-center text-2xl font-semibold text-white sm:text-left">
        {value}
      </div>

      <div className="mt-1 break-words text-center text-xs uppercase tracking-[0.2em] text-slate-400 sm:text-left">
        {label}
      </div>
    </div>
  );
}
