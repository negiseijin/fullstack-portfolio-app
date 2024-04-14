import { Button } from "@/components/ui/button";
import { hc } from "hono/client";
import type { InferResponseType } from "hono/client";
import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import type { AppType } from "../../server/src/index";
import "./App.css";
import reactLogo from "./assets/react.svg";

function CustomButton() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount((count) => count + 1);

  return (
    <Button type="button" onClick={handleClick}>
      count is {count}
    </Button>
  );
}

function App() {
  const client = hc<AppType>("http://localhost:3000/");
  const $post = client.posts.$post;
  // type PostReqType = InferRequestType<typeof $post>["form"];
  type PostResType = InferResponseType<typeof $post>;

  const $books = client.books.$post;
  // type BooksReqType = InferRequestType<typeof $books>["form"];
  type BooksResType = InferResponseType<typeof $books>;

  const [data, setData] = useState<PostResType>({
    ok: false,
    message: "",
  });

  const [books, setBooks] = useState<BooksResType>({
    ok: false,
    message: "",
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchData = async () => {
      const res = await client.posts.$post({
        form: {
          title: "Hello",
          body: "Hono is a cool project",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setData(data);
        console.log(data.message);
      }

      const res2 = await client.books.$post({
        form: {
          title2: "Hello",
          body2: "Hono is a cool project",
        },
      });
      if (res2.ok) {
        const data = await res2.json();
        setBooks(data);
        console.log(data.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="font-sans">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card bg-custom2">
        <CustomButton />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">{data.message}</p>
      <p className="read-the-docs">{books.message}</p>
    </div>
  );
}

export default App;
