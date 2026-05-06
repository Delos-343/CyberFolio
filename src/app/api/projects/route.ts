import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const projects = await prisma.project.findMany({
    where: { visible: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    take: 10,
  });
  return NextResponse.json({ projects });
}
