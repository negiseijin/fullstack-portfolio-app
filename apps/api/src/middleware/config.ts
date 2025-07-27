import dotenv from 'dotenv';
import type { Level } from 'pino';
import { z } from 'zod';

const label = ['debug', 'info', 'warn', 'error', 'fatal', 'trace'] as const satisfies Level[];

// Load environment variables from the root .env file
dotenv.config({ path: '../../.env' });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(label).default('info'),
  CORS_ORIGIN: z.url('Invalid URL for CORS_ORIGIN').default('http://localhost:3000'),
  DATABASE_URL: z.string('Invalid URL for DATABASE_URL'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
  // In a real application, you'd want to exit the process
  // process.exit(1);
  throw new Error('Invalid environment variables.');
}

export const config = parsedEnv.data;
