import { useCallback } from "react";

import ReactLogo2 from "@/assets/react2.svg";
import ReactLogo3 from "@/assets/react3.svg";
import { Comments } from "@/components/comments";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function Home() {
  const handleScroll = useCallback((e: React.UIEvent): void => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;

    console.log({ scrollHeight }, { scrollTop }, { clientHeight });
  }, []);

  return (
    <div className="h-screen py-3 container grid grid-rows-[1fr_auto] gap-4 font-sans">
      <header className="sticky top-0 z-10 grid grid-cols-[auto_1fr_auto] place-items-center p-4">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <Icon name="ViteLogo" className="logo" ariaLabel="Vite logo" />
          <img src={ReactLogo2} className="logo react" alt="React logo" />
          <img src={ReactLogo3} className="logo react" alt="React logo" />
        </a>
        <h1>Vite + React</h1>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
          className="grid"
        >
          <Icon
            name="ReactLogo"
            className="row-start-1 col-start-1 justify-self-end z-10"
            ariaLabel="ReactLogo"
          />
          <img
            src="https://via.placeholder.com/64x64/"
            alt=""
            className="row-start-1 col-start-1 aspect-square object-cover"
          />
        </a>
      </header>
      <main
        onScroll={handleScroll}
        className="grid gap-4 overflow-auto bg-red-500 p-4 scroll-mt-16"
      >
        {/* <Users /> */}
        <Comments />
      </main>
      <footer className="max-w-screen-pc sticky w-full mx-auto p-4">
        <div className="grid grid-cols-[1fr_auto] place-items-center gap-2">
          <Textarea
            placeholder="入力する..."
            className="resize-none focus:text-base"
          />
          <Button>Send message</Button>
        </div>
      </footer>
    </div>
  );
}
