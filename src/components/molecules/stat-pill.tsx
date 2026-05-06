import type { ReactNode } from 'react';

export function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400 text-justify">{label}</div>
    </div>
  );
}
