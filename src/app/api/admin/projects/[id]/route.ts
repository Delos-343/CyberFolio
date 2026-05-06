import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseProjectFormData } from '@/lib/project-upload';
import { requireAdminSession } from '@/lib/require-admin';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = params;
  const parsed = await parseProjectFormData(request);
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const project = await prisma.project.update({ where: { id }, data: parsed.data });
    return NextResponse.json({ project });
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to update project.' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
