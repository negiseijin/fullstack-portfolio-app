import { Fragment, useEffect, useState } from "react";

import { useUser } from "@/hooks/useUser";

type Props = {
  username: string;
};

export function Users({ username }: Props) {
  const [isReady, setIsReady] = useState(false);
  const { user, trigger } = useUser();

  useEffect(() => {
    if (isReady) return;
    setIsReady(true);
    (async () => {
      await trigger({ username });
    })();
  }, [isReady, trigger, username]);

  return (
    <>
      {user?.map((user) => (
        <Fragment key={user.id}>
          <p>{user.name}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.website}</p>
        </Fragment>
      ))}
    </>
  );
}
