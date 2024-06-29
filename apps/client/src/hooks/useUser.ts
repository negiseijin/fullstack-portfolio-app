import useSWR from "swr";

import { client } from "@/lib/utils";

const key = "users" as const;

const fetcher = async ({ req: { username } }: { req: ReqBody }) => {
  try {
    const res = await client.users.$post({
      json: {
        username: username,
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

type ReqBody = {
  username: string;
};

export function useUser({ username }: ReqBody) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    key,
    () => fetcher({ req: { username } }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  return {
    user: data,
    isError: error,
    isLoading,
    mutate,
    isValidating,
  };
}
