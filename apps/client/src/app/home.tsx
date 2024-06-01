import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Users } from "@/components/users";

export function Home() {
  return (
    <div className="h-screen container grid grid-rows-[auto_1fr_auto] gap-4 font-sans">
      <header className="sticky top-0 z-10 grid grid-cols-[auto_1fr_auto] place-items-center p-4">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <Icon name="ViteLogo" className="logo" ariaLabel="Vite logo" />
        </a>
        <h1>Vite + React</h1>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <Icon name="ReactLogo" className="logo react" ariaLabel="ReactLogo" />
        </a>
      </header>
      <main className="grid grid-flow-col gap-4 overflow-auto overflow-y-hidden bg-red-500 p-4">
        <Users />
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
