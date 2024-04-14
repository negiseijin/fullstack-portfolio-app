import { Button } from "@/components/ui/button";
import { useState } from "react";
import viteLogo from "/vite.svg";
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
