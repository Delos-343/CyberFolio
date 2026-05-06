import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminDashboard } from '@/components/organisms/admin-dashboard';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) redirect('/admin/login');

  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return <AdminDashboard initialProjects={projects} />;
}
