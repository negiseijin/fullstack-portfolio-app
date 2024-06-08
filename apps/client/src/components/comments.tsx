import { Fragment } from "react";

import { useComments } from "@/hooks/useComments";
import { generateKey } from "@/lib/utils";
import { Button } from "./ui/button";

export function Comments() {
  const { comment, setSize } = useComments();

  const handleSetSize = () => {
    setSize(10);

    const randomUUID = crypto.randomUUID();
    for (let index = 0; index < 5; index++) {
      const string = `${randomUUID}-${index}`;
      const key = generateKey(string);
      console.log(index, { key });
    }

    const initKey = generateKey("aaaaaa");
    console.log({ initKey }, initKey === Number.NaN.toString());
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
