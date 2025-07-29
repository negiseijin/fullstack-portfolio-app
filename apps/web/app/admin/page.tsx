import { AuthButton } from '@/components/auth-button';

export default async function AdminPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Admin</h1>
      <p className="text-muted-foreground">This is the admin dashboard.</p>
      <AuthButton />
    </>
  );
}
