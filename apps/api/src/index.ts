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
import { onError } from './error';
import { pinoMw } from './middleware';
import { auth, health } from './routes';
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

app.use(
  '*',
  initAuthConfig(() => ({
    secret: process.env.AUTH_SECRET,
    basePath: '/api/v1/auth',
    providers: authConfig.providers,
  })),
);
app.use('/auth/*', authHandler());

app.route('/', health);

app.use('*', verifyAuth());

const authorsApp = new OpenAPIHono()
  .get('/', (c) => c.json({ result: 'list authors' }))
  .post('/', (c) => c.json({ result: 'create an author' }, 201))
  .get('/:id', (c) => c.json({ result: `get ${c.req.param('id')}` }));
const booksApp = new OpenAPIHono()
  .get('/', (c) => c.json({ result: 'list books' }))
  .post('/', (c) => c.json({ result: 'create a book' }, 201))
  .get('/:id', (c) => c.json({ result: `get ${c.req.param('id')}` }));

// Routes
const routes = app
  .route('/auth', auth)
  .route('/authors', authorsApp)
  .route('/books', booksApp)
  .onError(onError);

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
export type AppType = typeof routes;
export { hc } from 'hono/client';
