import { OpenAPIHono } from '@hono/zod-openapi';
import healthzRoute from './healthz';
import rootRoute from './root';

const app = new OpenAPIHono().route('/', rootRoute).route('/', healthzRoute);

export default app;
