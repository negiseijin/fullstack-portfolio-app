import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import prisma from "@repo/database";
import { RequestUser, type ResponseUser } from "@repo/schema";

const app = new Hono()
  .get("/", async (c) => {
    const userInfo = await prisma.userInfo.findMany();
    console.log({ userInfo });

    return c.json("users");
  })
  .post("/", zValidator("json", RequestUser), async (c) => {
    const body = await c.req.json();
    console.log(body);
    // const url = `https://jsonplaceholder.typicode.com/users?username=${body.username}`;
    const url = "https://jsonplaceholder.typicode.com/users";
    const users: ResponseUser = await fetch(url).then((r) => r.json());
    const map = new Map<number, Omit<ResponseUser[number], "id">>();
    users.map(({ id, ...rest }) => map.set(id, rest));
    // await new Promise((r) => setTimeout(r, 5000));
    for (const [key, value] of map) {
      console.log(key, value);
      if (key === 5) {
        console.log("key=", key);
      }
    }
    return c.json(users);
  });

export default app;
