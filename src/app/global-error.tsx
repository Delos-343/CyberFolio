'use client';

import { useEffect } from 'react';

// Global error boundary — the last line of defense. This only renders when the
// root layout itself throws, so it must supply its own <html>/<body>.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Global error boundary]', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#020617',
          color: '#e2e8f0',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          padding: '1rem',
        }}
      >
        <div
          style={{
            maxWidth: '28rem',
            width: '100%',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '1.75rem',
            padding: '2rem',
          }}
        >
          <h1 style={{ fontSize: '1.5rem', margin: '0 0 0.75rem', color: '#fff' }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#cbd5e1', margin: 0 }}>
            The application hit an unexpected error. Please try again.
          </p>
          {error?.digest ? (
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '1rem' }}>
              Error reference: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: '1.5rem',
              padding: '0.5rem 1.25rem',
              fontSize: '0.875rem',
              color: '#cffafe',
              background: 'rgba(34,211,238,0.1)',
              border: '1px solid rgba(34,211,238,0.4)',
              borderRadius: '9999px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
