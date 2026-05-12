import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth';

export async function requireAdminSession() {
  
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  if (!session.user.isAdmin) {
    return null;
  }

  return session;
}