import { OpenAPIHono } from '@hono/zod-openapi';
import authRoute from './auth';

const app = new OpenAPIHono().basePath('/auth').route('/', authRoute);

export default app;
