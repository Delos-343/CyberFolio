import { ArrowRight, Sparkles } from 'lucide-react';
import { AnchorButton } from '@/components/atoms/button';
import { SocialLinks } from '@/components/molecules/social-links';
import { site, highlights } from '@/lib/site';

export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-4 pt-16 md:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-cyan-100">
            <Sparkles className="h-3.5 w-3.5" /> My CyberFolio
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Fachry Dwi Handoko
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 md:text-base text-justify">
              {site.description}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <AnchorButton href="#projects" className="w-full justify-center sm:w-auto">
              View Projects <ArrowRight className="h-4 w-4" />
            </AnchorButton>
            <AnchorButton
              href="#contact"
              className="w-full justify-center border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-100 hover:bg-fuchsia-500/20 sm:w-auto"
            >
              Contact Me
            </AnchorButton>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="
                  flex w-full items-center justify-center
                  rounded-full border border-white/10
                  bg-white/5 px-3 py-3
                  text-center text-sm text-slate-200
                  backdrop-blur-md
                  sm:min-h-[unset]
                "
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative m-auto md:my-8">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_40%),radial-gradient(circle_at_bottom,rgba(217,70,239,0.14),transparent_35%)] blur-xl motion-safe:animate-pulse" />
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-neon backdrop-blur-xl md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3 text-xs text-slate-300 text-center">
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-cyan-100">
                Personal Data
              </span>
              <span className="text-fuchsia-200">
                GitHub-Only Access
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400"> Summary </div>
                <p className="mt-2 text-sm leading-7 text-slate-200 text-justify">
                  Front-end-focused Software Engineer and Web Developer with hands-on experience building responsive interfaces, integrating APIs, and delivering client projects in React, Next.js (TypeScript), Tailwind, and related stacks.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400"> Education </div>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    Bachelor of Computer Science (Informatics)
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400"> Focus </div>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    B2C + B2B, government, corporate, and academia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
