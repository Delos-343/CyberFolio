import { projectSchema } from '@/lib/project-schema';

export async function parseProjectFormData(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get('coverImage') as File | null;
    const existing = formData.get('existingCoverImage')?.toString() || '';

    let coverImage = existing;

    // ✅ handle uploaded file
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      coverImage = `data:${file.type};base64,${buffer.toString('base64')}`;
    }

    // ❌ enforce image required
    if (!coverImage) {
      return { error: 'Cover image is required.' };
    }

    // ✅ FIX: properly parse stack
    const stackRaw = formData.get('stack')?.toString() || '';
    const stack = stackRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const data = projectSchema.parse({
      title: formData.get('title'),
      slug: formData.get('slug'),
      summary: formData.get('summary'),
      description: formData.get('description'),
      repoUrl: formData.get('repoUrl'),
      liveUrl: formData.get('liveUrl') || '',
      coverImage,
      stack,
      impact: formData.get('impact') || '',
      sortOrder: formData.get('sortOrder'),
      featured: formData.get('featured'),
      visible: formData.get('visible'),
    });

    return { data };
  } catch (err: any) {
    console.error('PARSE ERROR:', err);

    return {
      error:
        err?.issues?.[0]?.message ||
        err?.message ||
        'Invalid form data.',
    };
  }
}
