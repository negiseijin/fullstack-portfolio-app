import { z } from 'zod';

export const ErrorCodeSchema = z.union([
  z.literal('VALIDATION_ERROR'),
  z.literal('UNAUTHORIZED'),
  z.literal('FORBIDDEN'),
  z.literal('NOT_FOUND'),
  z.literal('CONFLICT'),
  z.literal('RATE_LIMITED'),
  z.literal('INTERNAL_ERROR'),
]);
export type ErrorCodeSchema = z.infer<typeof ErrorCodeSchema>;
