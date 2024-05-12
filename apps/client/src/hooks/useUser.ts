import useSWRMutation from "swr/mutation";

import type { ResponseUser } from "@repo/schema";
import useSWR from "swr";

const url = "http://localhost:3000/users";

const fetcher = async ({
  url,
  req: { username },
}: { url: string | null; req: ReqBody }) => {
  try {
    if (url === null) return;
    const body = { username };
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

export function useUser(req: ReqBody) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    () => [url, req],
    ([url, req]) => fetcher({ url, req }),
    {
      suspense: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  // const { trigger, data, error } = useSWRMutation(url, sendRequest);

  return {
    user: data,
    isError: error,
    isLoading,
    mutate,
    // trigger,
  };
}
