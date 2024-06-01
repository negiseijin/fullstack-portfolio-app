import { Fragment } from "react";

import { useInit } from "@/hooks/useInit";

export function Users() {
  const { init: user, isLoading } = useInit();

  if (isLoading) return <div>Loading</div>;

  return (
    <>
      {user?.map((user) => (
        <Fragment key={user?.id}>
          <ul className="bg-white grid gap-2 rounded-xl">
            <li>{user?.name}</li>
            <li>{user?.username}</li>
            <li>{user?.email}</li>
            <li>{user?.website}</li>
            <li>{user?.website}</li>
          </ul>
        </Fragment>
      ))}
    </>
  );
}
