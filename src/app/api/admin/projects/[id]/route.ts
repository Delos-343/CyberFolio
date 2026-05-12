import { NextResponse } from 'next/server';
import { deleteProject, updateProject } from '@/lib/supabase';
import { parseProjectFormData } from '@/lib/project-upload';
import { requireAdminSession } from '@/lib/require-admin';
export const runtime = 'nodejs';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = params;
  const parsed = await parseProjectFormData(request);
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const project = await updateProject(id, parsed.data);
    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    const code = (error as { code?: string; status?: number }).code;
    if (code === '23505' || (error as { status?: number }).status === 409) {
      return NextResponse.json({ error: 'Slug already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to update project.' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = params;
  await deleteProject(id);
  return NextResponse.json({ ok: true });
}
