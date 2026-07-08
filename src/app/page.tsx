import { listProjects } from '@/lib/supabase';
import type { Project } from '@/lib/project-types';
import { SiteShell } from '@/components/templates/site-shell';
import { Hero } from '@/components/organisms/hero';
import AboutSection from '@/components/organisms/about-section';
import SkillsSection from '@/components/organisms/skills-section';
import ProjectsSection from '@/components/organisms/projects-section';
import { ContactSection } from '@/components/organisms/contact-section';
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {

  noStore();

  // Never let a projects-fetch failure (e.g. missing Supabase env vars or a
  // transient network/database error) crash the entire page render. The rest of
  // the portfolio is static and should always be shown; the projects grid
  // degrades to a friendly notice instead of a 500.
  let projects: Project[] = [];
  let projectsFailed = false;

  try {
    projects = await listProjects({ visibleOnly: true, limit: 10 });
  } catch (error) {
    console.error('[HomePage] Failed to load projects from Supabase:', error);
    projectsFailed = true;
  }

  return (
    <SiteShell>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection projects={projects} failed={projectsFailed} />
      <ContactSection />
    </SiteShell>
  );
}
