import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';
import {
  type ProblemDetails,
  ProblemDetailsSchema,
  UpdateUserSchema,
  UserSchema,
} from '@repo/types';
import { userAuth } from '../../middleware';

const route = createRoute({
  method: 'patch',
  path: '/',
  summary: 'Update current user profile',
  tags: ['profile'],
  middleware: [
    zValidator('json', UpdateUserSchema, (result, _c) => {
      if (!result.success) {
        throw result.error;
      }
    }),
    userAuth(),
  ],
  request: {
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
      description: 'The updated user profile',
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
  const authUser = c.get('authUser');
  const body = c.req.valid('json');

  const user = await prisma.user.update({
    where: { id: authUser.user?.id },
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
