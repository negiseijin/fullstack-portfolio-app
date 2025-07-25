import { Hono } from 'hono';
import { rateLimiter } from 'hono-rate-limiter';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { secureHeaders } from 'hono/secure-headers';

import { serve } from '@hono/node-server';
import { pinoMw } from './middleware/logger';
import type { HonoVariables } from './types';

const app = new Hono<{
  Variables: HonoVariables;
}>().basePath('/api');

if (process.env.NODE_ENV !== 'production') {
  app.use(logger());
}
app.use(pinoMw);
app.use('*', requestId());
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', 'https://your-production-domain.com'],
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

app.onError((err, c) => {
  const requestId = c.get('requestId');
  const errorResponse = {
    message: 'Internal Server Error',
    requestId,
    error: {},
  };

  if (err instanceof HTTPException) {
    errorResponse.message = err.message;
    errorResponse.error = err.cause ?? {};
    return c.json(errorResponse, err.status);
  }

  errorResponse.error = {
    name: err.name,
    message: err.message,
  };

  return c.json(errorResponse, 500);
});

const route = app.get('/', (c) => {
  return c.json({
    message: 'Hello Hono!',
    requestId: c.get('requestId'),
  });
});

const port = 8787;

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

export default app;
export type AppType = typeof route;
