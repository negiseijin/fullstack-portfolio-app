import { OpenAPIHono } from '@hono/zod-openapi';
import getRoute from './get';
import updateRoute from './update';

const app = new OpenAPIHono().basePath('/profile').route('/', getRoute).route('/', updateRoute);

export default app;
