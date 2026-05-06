'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry], currentObserver) => {
        if (entry.isIntersecting) {
          setVisible(true);
          currentObserver.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -20% 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'transform-gpu will-change-transform transition-[opacity,transform,filter] duration-[4200ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        visible ? 'opacity-100 translate-y-0 blur-0 scale-100' : 'pointer-events-none opacity-0 translate-y-16 blur-lg scale-[0.965]',
        className
      )}
    >
      {children}
    </div>
  );
}
