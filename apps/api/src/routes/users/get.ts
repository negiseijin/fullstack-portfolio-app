import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import {
  type ProblemDetailsInput,
  ProblemDetailsSchema,
  UserIdSchema,
  UserSchema,
} from '@repo/types';
import { adminAuth } from '../../middleware';

const route = createRoute({
  method: 'get',
  path: '/{id}',
  summary: 'Get a user by ID',
  tags: ['users'],
  middleware: [adminAuth()],
  request: {
    params: UserIdSchema,
  },
  responses: {
    200: {
      description: 'A user',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
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
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    const res: ProblemDetailsInput = {
      title: 'Not Found',
      status: 404,
      detail: 'User not found',
    };
    return c.json(res, 404);
  }

  return c.json(user, 200);
});

export default app;
