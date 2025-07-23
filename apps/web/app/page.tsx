import { Button } from '@repo/ui/button';
import type { JSX } from 'react';

export default function Page(): JSX.Element {
  return (
    <div className="space-y-4">
      <h1 className="text-5xl font-bold">Welcome to the Portfolio</h1>
      <p>This is the home page.</p>
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
  );
}
