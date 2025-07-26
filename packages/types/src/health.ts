import { z } from 'zod';

export const HealthSchema = z
  .object({
    ok: z.boolean().meta({ description: 'Health check status' }).describe('Health check status'),
    message: z
      .string()
      .meta({ description: 'Health check message' })
      .describe('Health check message'),
  })
  .meta({ description: 'Health check response', title: 'Health check response' })
  .describe('Health check response')
  .brand<'HealthSchema'>();

export type HealthSchema = z.infer<typeof HealthSchema>;
