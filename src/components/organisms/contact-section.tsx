import { SectionHeading } from '@/components/molecules/section-heading';
import { site } from '@/lib/site';
import { SocialLinks } from '@/components/molecules/social-links';

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-12 md:px-6 md:py-14 lg:px-8">
        <div className="grid gap-5 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md lg:grid-cols-[1fr_auto] lg:items-center md:p-6">
          <div className="space-y-3">
            <SectionHeading
              eyebrow="Contact"
              title="< 12 parsecs to my Inbox."
              description={`You can refer to this section for inquiries, collaborations, and or hiring purposes.`}
            />
          </div>
          <div className="space-y-3">
            <a href={`mailto:${site.email}`} className="text-center inline-flex items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2.5 text-sm font-medium text-cyan-50 transition duration-700 hover:bg-cyan-300/15">
              {site.email}
            </a>
            <SocialLinks />
          </div>
        </div>
    </section>
  );
}

export default ContactSection;
