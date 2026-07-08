import { NextResponse } from 'next/server';
import { listProjects } from '@/lib/supabase';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projects = await listProjects({ visibleOnly: true, limit: 10 });
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('[GET /api/projects] Failed to load projects:', error);
    return NextResponse.json(
      { projects: [], error: 'Failed to load projects.' },
      { status: 502 },
    );
  }
}
