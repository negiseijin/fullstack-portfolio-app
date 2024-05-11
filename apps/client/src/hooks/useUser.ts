import useSWR from "swr";

import type { ResponseUser } from "@repo/schema";

const url = "http://localhost:3000/users";

const fetcher = async (url: string | URL | Request) => {
  try {
    const response = await fetch(url, { method: "POST" });
    const users: ResponseUser = await response.json();
    return users;
  } catch (error) {
    console.error(error);
  }
};

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
