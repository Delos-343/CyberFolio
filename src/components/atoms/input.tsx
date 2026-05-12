import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref} // ✅ THIS FIXES EVERYTHING
        className={cn(
          'w-full rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
