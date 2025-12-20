import type { OpenAPIHono } from '@hono/zod-openapi';
import { tags } from './tags';

type Doc31 = Parameters<OpenAPIHono['doc31']>[number];

export const doc31 = (port: number) => {
  return {
    openapi: '3.1.0',
    info: {
      version: '1.0.0',
      title: 'Portfolio API',
      description: 'Portfolio API',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'ローカルURL',
      },
    ],
    tags,
    sortComponents: 'alphabetically',
  } as const satisfies Doc31;
};
