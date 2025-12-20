import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';
import { CreateUserSchema, UserSchema } from '@repo/types';
import { tagDefs } from '../../lib';
import { adminAuth } from '../../middleware';

const route = createRoute({
  method: 'post',
  path: '/',
  summary: 'Create a new user',
  tags: [tagDefs.users.name],
  middleware: [
    zValidator('json', CreateUserSchema, (result, _c) => {
      if (!result.success) {
        throw result.error;
      }
    }),
    adminAuth(),
  ] as const,
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
