import { Fragment } from "react";

import { useInit } from "@/hooks/useInit";
import { useUser } from "@/hooks/useUser";

// type Props = {
//   username: string;
// };

export function Users() {
  const { init, isLoading: initLoading } = useInit();
  console.log(init, initLoading);

  const { user, isLoading } = useUser({ username: init?.name as string });

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
