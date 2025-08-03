import { OpenAPIHono } from '@hono/zod-openapi';
import auth from './auth';
import health from './health';
import profile from './profile';
import users from './users';

const app = new OpenAPIHono()
  .route('/', auth)
  .route('/', health)
  .route('/', profile)
  .route('/', users);

export default app;
