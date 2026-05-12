import { NextResponse } from 'next/server';
import { createProject, listProjects } from '@/lib/supabase';
import { parseProjectFormData } from '@/lib/project-upload';
import { requireAdminSession } from '@/lib/require-admin';
export const runtime = 'nodejs';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const projects = await listProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const parsed = await parseProjectFormData(request);
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const project = await createProject(parsed.data);
    if (!project) {
      return NextResponse.json({ error: 'Failed to create project.' }, { status: 500 });
    }

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    const code = (error as { code?: string; status?: number }).code;
    if (code === '23505' || (error as { status?: number }).status === 409) {
      return NextResponse.json({ error: 'Slug already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create project.' }, { status: 500 });
  }
}
