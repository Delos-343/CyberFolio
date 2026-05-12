'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function TopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 450);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      aria-label="Go back to the top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 z-50 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-950/80 p-4 text-sm text-cyan-100 shadow-neon backdrop-blur-xl transition-all duration-700 hover:-translate-y-0.5 hover:bg-slate-900 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'}`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
