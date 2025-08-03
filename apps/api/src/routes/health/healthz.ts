import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HealthSchema } from '@repo/types';

const route = createRoute({
  method: 'get',
  path: '/healthz',
  summary: 'Health check endpoint',
  tags: ['health'],
  responses: {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: HealthSchema.openapi({
            example: { ok: true, message: 'OK' },
            description: 'Health check response',
            title: 'HealthSchema',
          }),
        },
      },
    },
  },
});

const app = new OpenAPIHono().openapi(route, (c) => {
  return c.json({
    ok: true,
    message: 'OK',
  });
});

export default app;
