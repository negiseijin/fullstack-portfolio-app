import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { RootSchema } from '@repo/types';
import { tagDefs } from '../../lib';

const route = createRoute({
  method: 'get',
  path: '/',
  summary: 'Root endpoint',
  tags: [tagDefs.health.name],
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

const app = new OpenAPIHono().openapi(route, (c) => {
  return c.json({
    message: 'Hello from Health!',
    requestId: c.get('requestId'),
  });
});

export default app;
