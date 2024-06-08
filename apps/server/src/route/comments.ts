import { Hono } from "hono";

type Comments = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const app = new Hono()
  .get("/", async (c) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments",
      {
        method: "GET",
      },
    );
    const result: Comments[] = await response.json();

    return c.json(result);
  })
  .get("/:commentId", async (c) => {
    const { commentId } = c.req.param();

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments/${commentId}`,
      {
        method: "GET",
      },
    );
    const result: Comments = await response.json();

    return c.json(result);
  });

export default app;
