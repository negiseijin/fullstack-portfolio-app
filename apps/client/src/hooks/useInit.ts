import { stubInit } from "@/lib/utils";
import useSWR from "swr";
import { useCookie } from "./useCookie";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";

const fetcher =
  (arg: { cookie: string | null; name: string }) =>
  async (): Promise<{ cookie: string | null; name: string }> => {
    console.log(arg);

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return arg;
  };

const key = "init" as const;

export function useInit() {
  // set
  stubInit();

  const [name] = useCookie("name");
  const [user] = useLocalStorage<{ name: string }>("user", {
    name: "",
  });
  const { user: fetchUser } = useUser({
    username: name ?? user.name,
    isReady: true,
  });

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    key,
    fetcher({
      cookie: fetchUser?.[3]?.username ?? "",
      name: fetchUser?.[2]?.name ?? "",
    }),
    {
      suspense: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data,
    isError: error,
    isLoading,
    mutate,
    isValidating,
  };
}
