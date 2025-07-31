import { auth, signIn, signOut } from '@repo/auth';

function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <p>You are not logged in</p>
      <button type="submit">Sign in with GitHub</button>
    </form>
  );
}

function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <p>{children}</p>
      <button type="submit">Sign out</button>
    </form>
  );
}

export async function AuthButton() {
  const session = await auth();
  const user = session?.user?.name;

  return (
    <section>
      <h2>Home</h2>
      <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn />}</div>
    </section>
  );
}
