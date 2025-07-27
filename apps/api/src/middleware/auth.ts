import { createMiddleware } from 'hono/factory';

import { initAuthConfig } from '@hono/auth-js';
import { authConfig } from '@repo/auth';

export const initAuth = createMiddleware(async (_c, next) => {
  initAuthConfig(() => ({
    ...authConfig,
  }));
  await next();
});
