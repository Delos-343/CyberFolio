import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { visible: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      take: 10,
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to load projects:', error);
    return NextResponse.json([], { status: 200 });
  }
}
