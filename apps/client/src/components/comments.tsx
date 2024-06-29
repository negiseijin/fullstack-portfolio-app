import { Fragment } from "react";

import { useComments } from "@/hooks/useComments";
import { Button } from "./ui/button";

export function Comments() {
  const { comment, setSize } = useComments();

  const handleSetSize = () => {
    setSize((prev) => prev + 1);
  };

  const handleClear = () => {
    setSize(0);
  };

  return (
    <>
      {comment?.map((v) => (
        <Fragment key={v?.id}>
          <ul className="bg-white grid gap-2 rounded-xl">
            <li>{v?.name}</li>
            <li>{v?.email}</li>
            <li>{v?.postId}</li>
          </ul>
        </Fragment>
      ))}
      <Button onClick={handleSetSize}>setSize</Button>
      <Button onClick={handleClear}>clear</Button>
    </>
  );
}
