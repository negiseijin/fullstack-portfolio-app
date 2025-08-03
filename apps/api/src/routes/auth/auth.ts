import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

const route = createRoute({
  method: 'get',
  path: '/session',
  summary: 'Get current user session',
  description: 'Returns the session information of the currently authenticated user.',
  tags: ['auth'],
  responses: {
    200: {
      description: 'User session data',
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
    },
  },
});

const app = new OpenAPIHono().openapi(route, (c) => {
  const auth = c.get('authUser');
  return c.json(auth);
});

export default app;
