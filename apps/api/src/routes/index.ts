import { OpenAPIHono } from '@hono/zod-openapi';
import auth from './auth';
import health from './health';
import users from './users';

const app = new OpenAPIHono().route('/', auth).route('/', health).route('/', users);
// const app = new OpenAPIHono().route('/', users);

export default app;
