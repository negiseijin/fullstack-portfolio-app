// books.ts
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "param",
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    ),
    (c) => c.json("list books"),
  )
  .post(
    "/",
    zValidator(
      "form",
      z.object({
        title2: z.string(),
        body2: z.string(),
      }),
    ),
    (c) =>
      c.json({
        ok: true,
        message: "Created Books!",
      }),
  )
  .get(
    "/:id",
    zValidator(
      "query",
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    ),
    (c) => c.json(`get ${c.req.param("id")}`),
  );

export default app;
