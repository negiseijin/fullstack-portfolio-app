import useSWRMutation from "swr/mutation";

import type { ResponseUser } from "@repo/schema";

const url = "http://localhost:3000/users";

const fetcher = async ({
  url,
  req: { username },
}: { url: string | null; req: ReqBody }) => {
  try {
    console.log("body", url);

    if (url === null) return;
    const body = { username };
    console.log(body);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const users: ResponseUser = await response.json();
    return users;
  } catch (error) {
    console.error(error);
  }
};

async function sendRequest(
  url: string | URL | Request,
  { arg }: { arg: { username: string } },
): Promise<ResponseUser> {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

type ReqBody = {
  username: string;
};

export function useUser() {
  const { trigger, data, error } = useSWRMutation(url, sendRequest);

  return {
    user: data,
    isError: error,
    trigger,
  };
}
