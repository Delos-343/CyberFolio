import { type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

const githubClientId = process.env.GITHUB_CLIENT_ID ?? process.env.GITHUB_ID ?? '';
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET ?? process.env.GITHUB_SECRET ?? '';
const adminLogin = process.env.ADMIN_GITHUB_LOGIN ?? '';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },

  providers: [
    GitHubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
      authorization: { params: { scope: 'read:user user:email' } },
    }),
  ],

  callbacks: {
    async signIn({ profile, account }) {
      if (account?.provider !== 'github') return false;

      const login = (profile as { login?: string } | undefined)?.login;

      return login === adminLogin;
    },

    async jwt({ token, profile, account }) {
      if (account && profile) {
        const login = (profile as { login?: string }).login;

        token.login = login;
        token.isAdmin = login === adminLogin;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        isAdmin: Boolean(token.isAdmin),
        login: token.login as string | undefined,
      };

      return session;
    },
  },

  pages: {
    signIn: '/admin/login',
  },
};
