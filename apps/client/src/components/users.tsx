import { useUser } from "@/hooks/useUser";
import { Fragment } from "react/jsx-runtime";

export function Users() {
  const { user } = useUser();

  return (
    <>
      {user ? (
        user.map((user) => (
          <Fragment key={user.id}>
            <p>{user.name}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.website}</p>
          </Fragment>
        ))
      ) : (
        <p>undefined</p>
      )}
    </>
  );
}
