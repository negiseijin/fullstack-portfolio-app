import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma, type Role } from '@repo/database';
import NextAuth, { type NextAuthConfig, type NextAuthResult } from 'next-auth';

const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session({ session, token }) {
      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    // error: '/error',
  },
} satisfies NextAuthConfig;

const handler = NextAuth(authConfig);

export const GET: NextAuthResult['handlers']['GET'] = handler.handlers.GET;
export const POST: NextAuthResult['handlers']['POST'] = handler.handlers.POST;
export const auth: NextAuthResult['auth'] = handler.auth;
export const { signIn, signOut } = handler;
