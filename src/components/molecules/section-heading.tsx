import { Badge } from '@/components/atoms/badge';

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-full space-y-5">
      <Badge> {eyebrow} </Badge>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-300 text-justify">{description}</p>
      </div>
    </div>
  );
}
