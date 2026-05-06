import { type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      authorization: { params: { scope: 'read:user user:email' } },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== 'github') return false;
      const login = (profile as { login?: string } | null)?.login;
      return Boolean(login && login === process.env.ADMIN_GITHUB_LOGIN);
    },
    async jwt({ token, profile }) {
      const login = (profile as { login?: string } | null)?.login;
      if (login && login === process.env.ADMIN_GITHUB_LOGIN) {
        token.isAdmin = true;
        token.login = login;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.isAdmin = Boolean(token.isAdmin);
      if (typeof token.login === 'string') session.user.login = token.login;
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
};
