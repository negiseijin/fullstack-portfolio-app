import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { ProblemDetailsSchema, UserIdSchema } from '@repo/types';
import { adminAuth } from '../../middleware';

const route = createRoute({
  method: 'delete',
  path: '/{id}',
  summary: 'Delete a user',
  tags: ['users'],
  middleware: [adminAuth()],
  request: {
    params: UserIdSchema,
  },
  responses: {
    204: {
      description: 'No content',
    },
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: ProblemDetailsSchema,
        },
      },
    },
  },
});

const app = new OpenAPIHono().openapi(route, async (c) => {
  const prisma = c.get('prisma');
  const { id } = c.req.valid('param');
  await prisma.user.delete({ where: { id } });

  return new Response(null, { status: 204 });
});

export default app;
