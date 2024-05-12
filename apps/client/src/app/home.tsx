import { Suspense, lazy, useEffect, useState } from "react";

import type { ResponseUser } from "@repo/schema";

import reactLogo from "@/assets/react.svg";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Users } from "@/components/users";
import { useCookie } from "@/hooks/useCookie";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import viteLogo from "/vite.svg";

// const Users = lazy(() =>
//   import("./components/users").then((module) => ({ default: module.Users })),
// );

export function Home() {
  const [name] = useCookie("my-cookie");
  const [user] = useLocalStorage<ResponseUser[number]>("my-LocalStorage", {
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: 0,
        lng: 0,
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  return (
    <div className="h-screen container grid grid-rows-[auto_1fr_auto] gap-4 font-sans">
      <header className="sticky top-0 z-10 grid grid-cols-[auto_1fr_auto] place-items-center p-4">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <h1>Vite + React</h1>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </header>
      <main className="grid grid-flow-col gap-4 overflow-auto overflow-y-hidden bg-red-500 p-4">
        <Suspense fallback={<div>...LOADING!!!!!!!!!!!</div>}>
          <Users username={`${name}`} localUser={user} />
        </Suspense>
      </main>
      <footer className="max-w-screen-pc sticky w-full mx-auto p-4">
        <div className="grid grid-cols-[1fr_auto] place-items-center gap-2">
          <Textarea placeholder="入力する..." className="resize-none" />
          <Button>Send message</Button>
        </div>
      </footer>
    </div>
  );
}
