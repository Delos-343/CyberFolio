'use client';

import { useEffect } from 'react';

// Route-level error boundary. If any Server or Client Component in this route
// subtree throws (for example, a failed data fetch or a missing environment
// variable), Next.js renders this instead of the opaque production error page.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in the Vercel deployment logs so the real cause is recoverable
    // even though the message is hidden from the browser in production.
    console.error('[Route error boundary]', error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_30%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.08),transparent_30%),linear-gradient(to_bottom,rgba(15,23,42,0.8),rgba(2,6,23,1))]" />
      <div className="relative z-10 w-full max-w-md rounded-[1.75rem] border border-white/10 bg-white/5 p-8 text-center shadow-lg backdrop-blur-md">
        <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">System error</p>
        <h1 className="mt-3 text-2xl font-semibold text-white">Something went wrong</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          The page hit an unexpected error while loading. You can try again — if it keeps
          happening, the server logs will have the details.
        </p>
        {error?.digest ? (
          <p className="mt-4 rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-[11px] text-slate-400">
            Error reference: {error.digest}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-5 py-2 text-sm text-cyan-100 transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-cyan-300/60 hover:text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
