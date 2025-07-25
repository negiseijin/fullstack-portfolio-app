import type { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';

import pino from 'pino';
import type { HonoVariables } from '../types/hono';

type Env = {
  Variables: HonoVariables;
};

const transport =
  process.env.NODE_ENV !== 'production'
    ? pino.transport({
        level: process.env.LOG_LEVEL ?? 'info',
        target: 'pino-pretty',
        options: {
          ignore: 'pid,hostname',
          translateTime: 'yyyy-mm-dd HH:MM:ss.l',
        },
      })
    : undefined;

const logger = transport
  ? pino(transport)
  : pino({
      level: process.env.LOG_LEVEL ?? 'info',
      timestamp: pino.stdTimeFunctions.isoTime,
      redact: { paths: ['req.headers.authorization', '*.password'], censor: '***' },
    });

export const pinoMw = createMiddleware<Env>(async (c: Context, next: Next) => {
  const reqId = crypto.randomUUID();
  const child = logger.child({ reqId, path: c.req.path, method: c.req.method });
  c.set('logger', child);

  const start = performance.now();
  try {
    await next();
  } finally {
    child.info({ status: c.res.status, ms: performance.now() - start }, 'completed');
  }
});
