import { listProjects } from '@/lib/supabase';
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

  const projects = await listProjects({ visibleOnly: true, limit: 10 });

  return (
    <SiteShell>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection projects={projects} />
      <ContactSection />
    </SiteShell>
  );
}
