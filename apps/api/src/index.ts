import 'dotenv/config';
import { rateLimiter } from 'hono-rate-limiter';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { requestId } from 'hono/request-id';
import { secureHeaders } from 'hono/secure-headers';

import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js';
import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { authConfig } from '@repo/auth';
import { PrismaClient } from '@repo/database';
import { onError } from './error';
import { pinoMw, prisma as prismaMw } from './middleware';
import routes from './routes';
import health from './routes/health';
import { tags } from './utils';

const app = new OpenAPIHono().basePath('/api/v1');

// Middlewares
app.use('*', requestId());
if (process.env.NODE_ENV !== 'production') {
  app.use(logger());
  app.use(prettyJSON());
}
app.use(pinoMw);
app.use(
  '*',
  cors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true,
    maxAge: 86400,
  }),
);
app.use('*', secureHeaders());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-6', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    keyGenerator: (c) => c.req.header('cf-connecting-ip') ?? '', // Method to generate custom identifiers for clients.
  }),
);

// OpenAPI Docs
app.doc31('/doc', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'Portfolio API',
    description: 'Portfolio API',
  },
  tags: tags,
});

// Swagger UI
app.get('/ui', swaggerUI({ url: '/api/v1/doc' }));

app.route('/', health);

// Auth.js
app.use(
  '*',
  initAuthConfig(() => ({
    secret: process.env.AUTH_SECRET,
    basePath: '/api/v1/auth',
    providers: authConfig.providers,
  })),
);
app.use('/auth/*', authHandler());
app.use('*', verifyAuth());

const prisma = new PrismaClient();
app.use('*', prismaMw(prisma));

const apiRoutes = app.route('/', routes).onError(onError);

const port = 8787;

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`🚀 Server is running on http://localhost:${info.port}`);
    console.log(`🔗 Swagger UI is available at http://localhost:${info.port}/api/v1/ui`);
  },
);

export default app;
export type AppType = typeof apiRoutes;
export { hc } from 'hono/client';
