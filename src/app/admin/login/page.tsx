import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { LoginCard } from '@/components/organisms/login-card';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.isAdmin) redirect('/admin');
  return <LoginCard />;
}
