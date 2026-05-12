import { NextResponse } from 'next/server';
import { listProjects } from '@/lib/supabase';
export const runtime = 'nodejs';

export async function GET() {
  const projects = await listProjects({ visibleOnly: true, limit: 10 });
  return NextResponse.json({ projects });
}
