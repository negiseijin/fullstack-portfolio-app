import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

import { Role } from '@repo/types';

export const userAuth = () =>
  createMiddleware(async (c, next) => {
    const authUser = c.get('authUser');
    if (!authUser) {
      throw new HTTPException(401, { message: 'Unauthorized' });
    }
    await next();
  });

export const adminAuth = () =>
  createMiddleware(async (c, next) => {
    const { user } = c.get('authUser');
    if (!user) {
      throw new HTTPException(401, { message: 'Unauthorized' });
    }
    if ('role' in user && user.role !== Role.ADMIN) {
      throw new HTTPException(403, { message: 'Forbidden' });
    }

    await next();
  });
