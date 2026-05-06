import { Sparkles } from 'lucide-react';

export function PageLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 px-4 backdrop-blur-xl">
      <div className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-neon">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Loading</p>
            <h1 className="text-lg font-semibold text-white">Preparing the portfolio</h1>
          </div>
        </div>

        <div className="mt-6 space-y-3" aria-hidden="true">
          <div className="h-3 w-5/6 rounded-full bg-white/10" />
          <div className="h-3 w-2/3 rounded-full bg-white/10" />
          <div className="h-3 w-4/5 rounded-full bg-white/10" />
          <div className="h-3 w-1/2 rounded-full bg-white/10" />
        </div>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,rgba(34,211,238,0.25),rgba(217,70,239,0.75),rgba(34,211,238,0.25))] bg-[length:200%_100%] animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
