import { Fragment } from "react";

import { useUser } from "@/hooks/useUser";

type Props = {
  username: string;
  isReady: boolean;
};

export function Users({ username, isReady }: Props) {
  const { user, isLoading } = useUser({ username, isReady });

  if (isLoading) return null;

  return (
    <>
      {user?.map((user) => (
        <Fragment key={user.id}>
          <ul className="bg-white grid gap-2 rounded-xl">
            <li>{user.name}</li>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>{user.website}</li>
            <li>{user.website}</li>
          </ul>
        </Fragment>
      ))}
    </>
  );
}
