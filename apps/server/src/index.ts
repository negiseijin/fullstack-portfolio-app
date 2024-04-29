import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { RequestPost, type ResponsePost } from "@repo/schema";
import authors from "./route/authors";
import books from "./route/books";
import users from "./route/users";

const app = new Hono();
app.use(cors());
const routes = app
  .post("/posts", zValidator("json", RequestPost), (c) => {
    return c.json<ResponsePost>(
      {
        ok: true,
        message: "Created!!!!!!!!!!!!!!!!!!!!",
      },
      201,
    );
  })
  .route("/authors", authors)
  .route("/books", books)
  .route("/users", users);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
export type AppType = typeof routes;
