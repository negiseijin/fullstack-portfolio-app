import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { type ProblemDetails, ProblemDetailsSchema, UserSchema } from '@repo/types';
import { tagDefs } from '../../lib';
import { userAuth } from '../../middleware';

const route = createRoute({
  method: 'get',
  path: '/',
  summary: 'Get current user profile',
  tags: [tagDefs.profile.name],
  middleware: [userAuth()] as const,
  responses: {
    200: {
      description: 'The user profile',
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

  const user = await prisma.user.findUnique({
    where: { id: authUser.user?.id },
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
