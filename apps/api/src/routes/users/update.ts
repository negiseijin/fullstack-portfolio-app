import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';
import {
  type ProblemDetails,
  ProblemDetailsSchema,
  UpdateUserSchema,
  UserIdSchema,
  UserSchema,
} from '@repo/types';
import { adminAuth } from '../../middleware';

const route = createRoute({
  method: 'patch',
  path: '/{id}',
  summary: 'Update a user',
  tags: ['users'],
  middleware: [
    zValidator('param', UpdateUserSchema, (result, _c) => {
      if (!result.success) {
        throw result.error;
      }
    }),
    adminAuth(),
  ],
  request: {
    params: UserIdSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateUserSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'The updated user',
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
  const body = c.req.valid('json');
  const user = await prisma.user.update({
    where: { id },
    data: body,
  });

  if (!user) {
    const res: ProblemDetails = {
      title: 'Not Found',
      status: 404,
      detail: 'User not found',
    } satisfies ProblemDetails;
    return c.json(res, 404);
  }

  return c.json(user, 200);
});

export default app;
