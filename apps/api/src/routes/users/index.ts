import { OpenAPIHono } from '@hono/zod-openapi';
import createRoute from './create';
import deleteRoute from './delete';
import getRoute from './get';
import updateRoute from './update';

const app = new OpenAPIHono()
  .basePath('/users')
  .route('/', getRoute)
  .route('/', createRoute)
  .route('/', updateRoute)
  .route('/', deleteRoute);

export default app;
