import { signIn } from '@repo/auth';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Choose your preferred sign-in method</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form
              action={async () => {
                'use server';
                await signIn('github', { redirectTo: '/' });
              }}
            >
              <Button className="w-full" type="submit" variant="outline">
                Sign In with GitHub
              </Button>
            </form>
            <form
              action={async () => {
                'use server';
                await signIn('google', { redirectTo: '/' });
              }}
            >
              <Button className="w-full" type="submit" variant="outline">
                Sign In with Google
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
