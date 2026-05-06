'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/atoms/button';
import { Github, ShieldCheck } from 'lucide-react';

export function LoginCard() {
  return (
    <div className="mx-auto flex min-h-[64vh] max-w-lg items-center px-4 py-12 md:px-6">
      <div className="w-full rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md md:p-7">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-semibold text-white">Fachry Dwi Handoko admin login</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">Only the GitHub account on the allowlist can enter. No other login providers are enabled.</p>
        <div className="mt-6">
          <Button type="button" onClick={() => signIn('github', { callbackUrl: '/admin' })} className="w-full">
            <Github className="h-4 w-4" /> Continue with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
