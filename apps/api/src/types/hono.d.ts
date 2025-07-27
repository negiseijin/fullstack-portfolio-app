import type pino from 'pino';

declare module 'hono' {
  interface ContextVariableMap {
    startTime: number;
    logger: pino.Logger;
  }
}
