import { SectionHeading } from '@/components/molecules/section-heading';
import { ProjectCard } from '@/components/molecules/project-card';
import type { Project } from '@/lib/project-types';
import type { CSSProperties } from 'react';

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-12 md:px-6 md:py-14 lg:px-8">
        <div className="space-y-12">
          <SectionHeading
            eyebrow="Selected work"
            title="Look on my Works, ye Mighty, and despair!"
            description="From smooth-scroll transitions to dynamic, interactable sprites, every single one of my projects is designed to feel alive."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.length ? (
              projects.map((project, index) => (
                <div
                  key={project.id}
                  className="card-scan-stage"
                  style={{ '--scan-delay': `${index * 150}ms` } as CSSProperties}
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))
            ) : (
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-slate-300">No projects have been published yet. Sign in as admin and add the first project.</div>
            )}
          </div>
        </div>
    </section>
  );
}
