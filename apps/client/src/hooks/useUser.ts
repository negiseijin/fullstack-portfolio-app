import useSWR from "swr";

import type { ResponseUser } from "@repo/schema";

const url = "http://localhost:3000/users";

const fetcher = (url: string | URL | Request) =>
  fetch(url, { method: "POST" }).then(
    (r) => r.json() as unknown as ResponseUser,
  );

export function useUser() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${url}`,
    fetcher,
    {
      suspense: true,
    },
  );

  return {
    user: data,
    isLoading,
    isError: error,
    isValidating,
    mutate,
  };
}
