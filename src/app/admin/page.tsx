import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { listProjects } from '@/lib/supabase';
import { AdminDashboard } from '@/components/organisms/admin-dashboard';

export default async function AdminPage() {
  
  const session = await getServerSession(authOptions);

  // FIX: explicit null-safe check
  if (!session || !session.user?.isAdmin) {
    redirect('/admin/login');
  }

  const projects = await listProjects();

  return <AdminDashboard initialProjects={projects} />;
}