import { useUser } from "@/hooks/useUser";
import { Fragment, useEffect, useState } from "react";

export function Users() {
  const [show, setShow] = useState(false);
  const { user, trigger } = useUser();

  useEffect(() => {
    if (show) return;
    trigger({ username: "Bret" });
    setShow(true);
  }, [show, trigger]);

  return (
    <>
      {show && user ? (
        user.map((user) => (
          <Fragment key={user.id}>
            <p>{user.name}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.website}</p>
          </Fragment>
        ))
      ) : (
        <div>...LOADING</div>
      )}
    </>
  );
}
