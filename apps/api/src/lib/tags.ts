import type { OpenAPIHono } from '@hono/zod-openapi';

type Tags = Parameters<OpenAPIHono['getOpenAPI31Document']>[0]['tags'];
type TagsObject = Exclude<Tags, undefined>[number];

export const tagDefs = {
  health: {
    name: 'health',
    description: 'Health check',
  },
  auth: {
    name: 'auth',
    description: 'Returns the session information of the currently authenticated user.',
  },
  users: {
    name: 'users',
    description: '',
  },
  profile: {
    name: 'profile',
    description: '',
  },
} as const satisfies Record<string, TagsObject>;

export const tags = Object.values(tagDefs);
