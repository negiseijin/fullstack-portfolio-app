import { Icon } from "@/components/icon";
import { MediaQuery } from "@/components/media-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Welcome } from "@/components/welcome";

export function Home() {
  return (
    <div className="h-screen py-3 container grid grid-rows-[1fr_auto] gap-4 font-sans">
      <header className="sticky top-0 z-10 grid grid-cols-[auto_1fr_auto] place-items-center p-4">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <Icon
            name="ViteLogo"
            height={40}
            width={40}
            className="logo"
            aria-label="Vite logo"
          />
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
            aria-label="ReactLogo"
          />
          <img
            src="https://via.placeholder.com/64x64/"
            alt=""
            className="row-start-1 col-start-1 aspect-square object-cover"
          />
        </a>
      </header>
      <main className="grid gap-4 overflow-auto bg-red-500 p-4 scroll-mt-16">
        <MediaQuery />
        <Welcome />
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
