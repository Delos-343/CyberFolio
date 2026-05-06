import { prisma } from '@/lib/prisma';
import { SiteShell } from '@/components/templates/site-shell';
import { Hero } from '@/components/organisms/hero';
import AboutSection from '@/components/organisms/about-section';
import SkillsSection from '@/components/organisms/skills-section';
import ProjectsSection from '@/components/organisms/projects-section';
import { ContactSection } from '@/components/organisms/contact-section';

export default async function HomePage() {
  const projects = await prisma.project.findMany({
    where: { visible: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    take: 10,
  });

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
