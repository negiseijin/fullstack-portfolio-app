import { z } from 'zod';

export const HttpStatusSchema = z.union([
  z.literal(400),
  z.literal(401),
  z.literal(403),
  z.literal(404),
  z.literal(409),
  z.literal(422),
  z.literal(429),
  z.literal(500),
  z.literal(200),
  z.literal(201),
  z.literal(204),
]);

export type HttpStatus = z.infer<typeof HttpStatusSchema>;
