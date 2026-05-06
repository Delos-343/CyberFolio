import { SectionHeading } from '@/components/molecules/section-heading';
import { SkillPill } from '@/components/molecules/skill-pill';
import { skills } from '@/lib/site';

function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-12 md:px-6 md:py-14 lg:px-8">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6">
          <SectionHeading
            eyebrow="Core stack"
            title="Spare parts, no extra bulk."
            description="All my project structures stay easy to extend with atomic design, while keeping the application itself lightweight, future-proof, and maintainable."
          />
          <div className="mt-6 flex flex-wrap gap-2.5 text-center">
            {skills.map((skill) => (
              <SkillPill key={skill}>{skill}</SkillPill>
            ))}
          </div>
        </div>
    </section>
  );
}

export default SkillsSection;
