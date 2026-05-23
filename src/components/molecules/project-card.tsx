import Link from 'next/link';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import type { Project } from '@/lib/project-types';
import type { CSSProperties } from 'react';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className="card-scan-reveal group relative flex h-[34rem] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-cyan-300/30 hover:shadow-neon md:h-[35.5rem] md:p-5"
      style={{ '--scan-delay': `${index * 150}ms` } as CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.1),transparent_35%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="card-scan-beam absolute inset-y-0 left-[-30%] w-[30%] bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.14),rgba(34,211,238,0.85),rgba(217,70,239,0.92),rgba(34,211,238,0.18),transparent)] blur-[1px] mix-blend-screen" />
        <div className="card-scan-line absolute inset-y-0 left-[-18%] w-[14%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),rgba(255,255,255,0.9),rgba(255,255,255,0.05),transparent)] opacity-70 blur-sm" />
      </div>

      <div className="relative flex h-full min-h-0 flex-1 flex-col gap-3.5">
        {project.coverImage ? (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
            <img src={project.coverImage} alt={project.title} className="h-40 w-full object-cover transition duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] md:h-44" />
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
            {project.featured ? 'Featured' : 'Selected'}
          </div>
          <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-fuchsia-100">
            #{project.sortOrder.toString().padStart(2, '0')}
          </span>
        </div>

        <div className="space-y-2.5">
          <h3 className="line-clamp-2 text-xl font-semibold leading-tight text-white">{project.title}</h3>
          <p className="line-clamp-2 text-sm leading-6 text-slate-300">{project.summary}</p>
          <p className="line-clamp-3 text-sm leading-6 text-slate-400 text-justify">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-slate-950/50 px-2.5 py-1 text-[11px] text-slate-200">
              {item}
            </span>
          ))}
        </div>

        {project.impact ? <p className="line-clamp-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-3 text-xs leading-6 text-cyan-50/90">{project.impact}</p> : null}
        <div className="mt-auto flex w-full gap-3 pt-1.5 text-sm">
          <Link
            href={project.repoUrl}
            target="_blank"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-slate-100 transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-cyan-300/40 hover:text-cyan-100"
          >
            <Github className="h-4 w-4" /> Repository
          </Link>
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-slate-100 transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-fuchsia-300/40 hover:text-fuchsia-100"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
