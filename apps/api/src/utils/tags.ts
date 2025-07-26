import type { OpenAPIHono } from '@hono/zod-openapi';

type Tags = Parameters<OpenAPIHono['getOpenAPIDocument']>[0]['tags'];
type TagsObject = Exclude<Tags, undefined>[number];

const health = {
  name: 'health',
  description: 'Health check',
} satisfies TagsObject;

export const tags = [health] satisfies TagsObject[];
