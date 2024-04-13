import authors from "@/route/authors";
import books from "@/route/books";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const routes = app.route("/authors", authors).route("/books", books);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
export type AppType = typeof routes;
