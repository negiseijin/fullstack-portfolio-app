import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import authors from "./route/authors";
import books from "./route/books";

const app = new Hono();
app.use(cors());
const routes = app
  .post(
    "/posts",
    zValidator(
      "form",
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    ),
    (c) => {
      // ...
      return c.json(
        {
          ok: true,
          message: "Created!",
        },
        201,
      );
    },
  )
  .route("/authors", authors)
  .route("/books", books);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
export type AppType = typeof routes;
