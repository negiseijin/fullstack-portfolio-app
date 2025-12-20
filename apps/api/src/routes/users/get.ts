import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';
import { type ProblemDetails, ProblemDetailsSchema, UserIdSchema, UserSchema } from '@repo/types';
import { adminAuth } from '../../middleware';

const route = createRoute({
  method: 'get',
  path: '/{id}',
  summary: 'Get a user by ID',
  description: `Retrieve a user from the database using their unique ID.`,
  tags: ['users'],
  middleware: [
    zValidator('param', UserIdSchema, (result, _c) => {
      if (!result.success) {
        throw result.error;
      }
    }),
    adminAuth(),
  ],
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
