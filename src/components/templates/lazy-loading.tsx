'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

export function LazyLoading({
  children,
  height = 300,
}: {
  children: ReactNode;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: height }}>
      {visible ? (
        children
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full min-h-[inherit] items-center justify-center rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
        >
          <div className="w-full max-w-2xl space-y-4 animate-pulse">
            <div className="h-3 w-24 rounded-full bg-white/10" />
            <div className="h-8 w-3/5 rounded-full bg-white/10" />
            <div className="space-y-3">
              <div className="h-3 w-full rounded-full bg-white/10" />
              <div className="h-3 w-11/12 rounded-full bg-white/10" />
              <div className="h-3 w-5/6 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
