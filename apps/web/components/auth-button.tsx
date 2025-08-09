import { auth, signOut } from '@repo/auth';
import { Button } from '@repo/ui/components/button';
import Link from 'next/link';

export async function AuthButton() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <Button asChild>
        <Link href="/login">Sign In</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <Button size="sm" type="submit" variant="outline">
          Sign Out
        </Button>
      </form>
    </div>
  );
}
