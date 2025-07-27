import type { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';

import pino from 'pino';
import { config } from './config';

const transport =
  config.NODE_ENV !== 'production'
    ? pino.transport({
        level: config.LOG_LEVEL,
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
      level: config.LOG_LEVEL,
      timestamp: pino.stdTimeFunctions.isoTime,
      redact: { paths: ['req.headers.authorization', '*.password'], censor: '***' },
    });

export const pinoMw = createMiddleware(async (c: Context, next: Next) => {
  const reqId = c.get('requestId');
  const child = logger.child({ reqId, path: c.req.path, method: c.req.method });
  c.set('logger', child);

  child.info({ header: c.req.header(), queries: c.req.queries() }, 'request');

  const start = performance.now();
  try {
    await next();
  } finally {
    child.info({ status: c.res.status, ms: performance.now() - start }, 'completed');
  }
});
