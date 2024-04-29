import { Hono } from "hono";

import { prisma } from "@repo/database";

const app = new Hono().get("/", async (c) => {
  const users = await prisma.user.findMany();
  return c.json(users);
});

export default app;
