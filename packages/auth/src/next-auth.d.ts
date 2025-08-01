import type { Role } from '@repo/database';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: Role;
    } & DefaultSession['user'];
  }

  interface User {
    role: Role;
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser {
    role: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: Role;
  }
}
