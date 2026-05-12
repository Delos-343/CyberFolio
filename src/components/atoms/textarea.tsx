import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref} // ✅ CRITICAL FIX
      className={cn(
        'min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20',
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';
