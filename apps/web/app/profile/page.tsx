// import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/profile-form';
import { client } from '@/lib/api';

export default async function ProfilePage() {
  const res = await client.api.v1.profile.$get();

  if (!res.ok) {
    if (res.status === 404) {
      //   redirect('/login');
      // }
      const error = await res.json();
      return (
        <div className="text-red-500">
          <h1 className="text-3xl font-bold">Error</h1>
          <p>{error.detail ?? 'Failed to fetch profile.'}</p>
        </div>
      );
    }
  }

  const user = await res.json();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">This is where you can manage your profile settings.</p>
      </div>
      <div className="w-full border-t border-border" />
      <ProfileForm user={user} />
    </div>
  );
}
