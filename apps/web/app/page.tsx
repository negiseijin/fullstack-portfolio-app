import { Button } from '@repo/ui/button'
import type { JSX } from 'react'

export default function Page(): JSX.Element {
  return (
    <main>
      <h1 className="bg-primary-500 text-9xl">Web</h1>
      <Button type="button">button</Button>
    </main>
  )
}
