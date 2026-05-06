import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseProjectFormData } from '@/lib/project-upload';
import { requireAdminSession } from '@/lib/require-admin';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const projects = await prisma.project.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] });
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
    const project = await prisma.project.create({ data: parsed.data });
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create project.' }, { status: 500 });
  }
}
