import useSWRMutation from "swr/mutation";

import type { ResponseUser } from "@repo/schema";

const url = "http://localhost:3000/users";

const fetcher = async (
  url: string | URL | Request,
  { arg }: { arg: { username: string } },
) => {
  try {
    const body = { ...arg };
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

export function useUser() {
  const { data, error, trigger } = useSWRMutation(`${url}`, fetcher);

  return {
    user: data,
    isError: error,
    trigger,
  };
}
