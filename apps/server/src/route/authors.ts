// authors.ts
import { Hono } from "hono";

const app = new Hono()
  .get("/", async (c) => {
    // const response = await fetch("http://localhost:3000/posts", {
    //   method: "POST", // or 'PUT'
    //   // headers: {
    //   //   "Content-Type": "application/json",
    //   // },
    //   body: JSON.stringify({ title: "11111", body: "2222222" }),
    // });
    const response = await fetch("http://localhost:3000/authors/100000", {
      method: "GET",
    });
    const result = await response.json();
    console.log("result!!!!!!!!!", result);

    return c.json("list authors");
  })
  .post("/", (c) => c.json("create an author", 201))
  .get("/:id", (c) => c.json(`get!!!!!!!!!! ${c.req.param("id")}`));

export default app;
