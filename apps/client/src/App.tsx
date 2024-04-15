import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import reactLogo from "./assets/react.svg";

import { Button } from "@/components/ui/button";
import type { RequestPost, ResponsePost } from "@repo/schema";

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
  const [data, setData] = useState<ResponsePost>({
    ok: false,
    message: "",
  });

  const param: RequestPost = {
    title: "Hello",
    body: "Hono is a cool project",
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
      });
      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log(data.message);
      }
    })();
  }, []);

  return (
    <div className="font-sans container bg-green-300 mobile:bg-orange-600">
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
    </div>
  );
}

export default App;
