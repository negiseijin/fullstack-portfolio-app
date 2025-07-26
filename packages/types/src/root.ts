import { z } from 'zod';

export const RootSchema = z
  .object({
    message: z.string().meta({ description: 'Root message' }).describe('Root message'),
    requestId: z.string().meta({ description: 'Request ID' }).describe('Request ID'),
  })
  .meta({ description: 'Root response', title: 'Root response' })
  .describe('Root response')
  .brand<'RootSchema'>();

export type RootSchema = z.infer<typeof RootSchema>;
