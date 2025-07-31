import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { HealthSchema, RootSchema } from '@repo/types';

const healthzRoute = createRoute({
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

const rootRoute = createRoute({
  method: 'get',
  path: '/',
  summary: 'Root endpoint',
  tags: ['health'],
  responses: {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: RootSchema.openapi({
            example: { message: 'Hello from Health!', requestId: '1234567890' },
            description: 'Root response',
            title: 'RootSchema',
          }),
        },
      },
    },
  },
});

const health = new OpenAPIHono()
  .openapi(rootRoute, (c) => {
    return c.json({
      message: 'Hello from Health!',
      requestId: c.get('requestId'),
    });
  })
  .openapi(healthzRoute, (c) => {
    return c.json({
      ok: true,
      message: 'OK',
    });
  });

export default health;
