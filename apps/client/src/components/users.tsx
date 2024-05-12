import { Fragment } from "react";

import type { ResponseUser } from "@repo/schema";

import { useUser } from "@/hooks/useUser";

type Props = {
  username: string;
  localUser: ResponseUser[number];
};

export function Users({ username, localUser }: Props) {
  const { user, isLoading } = useUser({ username });

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
      <ul className="bg-white grid gap-2 rounded-xl">
        <li>{localUser.name}</li>
        <li>{localUser.username}</li>
        <li>{localUser.email}</li>
        <li>{localUser.website}</li>
        <li>{localUser.website}</li>
      </ul>
    </>
  );
}
