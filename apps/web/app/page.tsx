import { ThemeSwitcher } from '@components/theme-switcher';
import { Button } from '@repo/ui/button';
import type { JSX } from 'react';

export default function Page(): JSX.Element {
  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <div className="space-y-4">
        <h1 className="text-5xl font-bold">Web</h1>
        <p>Theme switcher is available in the top right corner.</p>
        <div className="flex items-center gap-4">
          <Button type="button">Primary</Button>
          <Button type="button" variant="secondary">
            Secondary
          </Button>
          <Button type="button" variant="destructive">
            Destructive
          </Button>
          <Button type="button" variant="ghost">
            Ghost
          </Button>
          <Button type="button" variant="link">
            Link
          </Button>
        </div>
      </div>
    </main>
  );
}
