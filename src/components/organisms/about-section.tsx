import { SectionHeading } from '@/components/molecules/section-heading';
import { StatPill } from '@/components/molecules/stat-pill';

function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-12 md:px-6 md:py-14 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6">
            <SectionHeading
              eyebrow="About"
              title="Focused and Intentional."
              description="Take a look at my strongest work, curated and maintained with the best, top-of-the-line quality code."
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <StatPill value="Top 10" label="best projects" />
            <StatPill value="1 Portfolio" label="to rule them all" />
            <StatPill value="100%" label="mobile-responsive" />
            <StatPill value="1000 PX" label="scroll-triggered motion" />
          </div>
        </div>
    </section>
  );
}

export default AboutSection;
