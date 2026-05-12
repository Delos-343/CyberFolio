import { z } from 'zod';

const optionalText = z.union([z.string().max(220), z.literal('')]).default('');

export const projectSchema = z.object({
  title: z.string().min(2).max(120),
  slug: z.string().min(2).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use kebab-case only.'),
  summary: z.string().min(10).max(220),
  description: z.string().min(20).max(4000),
  repoUrl: z.string().url(),
  liveUrl: z.union([z.string().url(), z.literal('')]).default(''),
  coverImage: z.string().optional(),
  stack: z.array(z.string().min(1)).min(1).max(8),
  impact: optionalText,
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
  featured: z.coerce.boolean().default(false),
  visible: z.coerce.boolean().default(true),
});

export const projectFormSchema = projectSchema.omit({ coverImage: true });

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectFormInput = z.infer<typeof projectFormSchema>;
