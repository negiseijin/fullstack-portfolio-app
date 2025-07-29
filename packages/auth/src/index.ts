import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma, type Role } from '@repo/database';
import NextAuth, { type NextAuthConfig, type NextAuthResult, type Session } from 'next-auth';

const authConfig = {
  debug: process.env.NODE_ENV !== 'production',
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
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
  cookies: {
    sessionToken: {
      name: 'session',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        secure: process.env.NODE === 'production',
      },
    },
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
} satisfies NextAuthConfig;

const handler = NextAuth(authConfig);

const GET: NextAuthResult['handlers']['GET'] = handler.handlers.GET;
const POST: NextAuthResult['handlers']['POST'] = handler.handlers.POST;
const auth: NextAuthResult['auth'] = handler.auth;
const { signIn, signOut } = handler;
export { auth, authConfig, GET, POST, signIn, signOut };
export type { Session };
