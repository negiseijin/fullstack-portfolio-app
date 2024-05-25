import useSWR from "swr";

import { client } from "@/lib/utils";

const url = "http://localhost:3000/users";

const fetcher = async ({
  req: { username },
}: { url: string | null; req: ReqBody }) => {
  try {
    if (!username) return;
    const res = await client.users.$post({
      json: {
        username: username,
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));

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

export function useUser({ isReady, ...req }: ReqBody & { isReady: boolean }) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    () => [isReady ? url : null, req],
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
