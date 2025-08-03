import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { CreateUserSchema, UserSchema } from '@repo/types';
import { adminAuth } from '../../middleware';

const route = createRoute({
  method: 'post',
  path: '/',
  summary: 'Create a new user',
  tags: ['users'],
  middleware: [adminAuth()],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'The created user',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
  },
});

const app = new OpenAPIHono().openapi(route, async (c) => {
  const prisma = c.get('prisma');
  const body = c.req.valid('json');
  const user = await prisma.user.create({
    data: body,
  });

  return c.json(user, 201);
});

export default app;
