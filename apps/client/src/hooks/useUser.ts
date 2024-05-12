import useSWR from "swr";

import { client } from "@/lib/utils";

const url = "http://localhost:3000/users";

const fetcher = async ({
  url,
  req: { username },
}: { url: string | null; req: ReqBody }) => {
  try {
    if (url === null) return;
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

  return {
    user: data,
    isError: error,
    isLoading,
    mutate,
    isValidating,
  };
}
