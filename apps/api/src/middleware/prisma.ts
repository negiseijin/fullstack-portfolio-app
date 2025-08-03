import { createMiddleware } from 'hono/factory';

import type { PrismaClient } from '@repo/database';

declare module 'hono' {
  interface ContextVariableMap {
    prisma: PrismaClient;
  }
}

export const prisma = (client: PrismaClient) =>
  createMiddleware(async (c, next) => {
    c.set('prisma', client);
    await next();
  });
