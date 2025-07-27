import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { Prisma } from '@repo/database';
import type { ProblemDetailsInput } from '@repo/types';
import { err as setErr } from '@repo/types';
import { ZodError } from 'zod';

export function onError(err: unknown, c: Context) {
  const traceId = c.get('requestId');
  const logger = c.get('logger');
  const instance = c.req.url;

  if (err instanceof ZodError) {
    const errors: ProblemDetailsInput['errors'] = {};
    for (const i of err.issues) {
      const path = i.path.join('.') || '_';
      errors[path] = [...(errors[path] ?? []), i.message];
    }

    const res = setErr({
      title: err.name,
      message: err.message,
      traceId,
      status: 400,
      detail: err.stack,
      code: 'VALIDATION_ERROR',
      instance,
      errors,
    });
    logger.error({ res });

    return c.json(res, 400);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const status = 500;
    const res = setErr({
      title: err.name,
      message: err.message,
      traceId,
      status,
      detail: err.stack,
      code: err.code,
      instance,
      meta: err.meta,
    });
    logger.error({ res });

    return c.json(res, status);
  }

  if (err instanceof HTTPException) {
    const status = err.status ?? 500;
    const res = setErr({
      title: err.name,
      message: err.message,
      traceId,
      status,
      detail: err.stack,
      code: err.constructor.name,
      instance,
    });
    logger.error({ res });

    return c.json(res, status);
  }

  if (err instanceof Error) {
    const res = setErr({
      title: err.name,
      message: err.message,
      traceId,
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      detail: err.stack,
      instance,
      cause: err.cause,
    });
    logger.error({ res });

    return c.json(res, 500);
  }

  const res = setErr({
    title: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
    traceId,
    code: 'INTERNAL_SERVER_ERROR',
    status: 500,
  });
  logger.error({ res }, 'Unexpected error');

  return c.json(res, 500);
}
