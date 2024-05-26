import { stubInit } from "@/lib/utils";
import useSWR from "swr";
import { useCookie } from "./useCookie";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";

const fetcher =
  (arg: { cookie: string | null; name: string }) =>
  async (): Promise<{ cookie: string | null; name: string }> => {
    // async (): Promise<boolean> => {
    console.log({ arg });

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return arg;
    // return true;
  };

const key = "init" as const;

export function useInit() {
  // set
  stubInit();

  const [name] = useCookie("name");
  const [user] = useLocalStorage<{ name: string }>("user", {
    name: "",
  });
  const { user: fetchUser, isLoading: userLoading } = useUser({
    username: name ?? user.name,
  });

  const {
    data: init,
    mutate: setInit,
    isLoading: initLoading,
  } = useSWR<{
    cookie: string | null;
    name: string;
  }>(key, null, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    userLoading ? null : key,
    fetcher({
      cookie: fetchUser?.[3]?.username ?? "",
      name: fetchUser?.[2]?.name ?? "",
    }),
    {
      onSuccess(data, key, config) {
        console.log(data, key, config);
        setInit({ ...data });
      },
      // suspense: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data,
    init,
    isError: error,
    isLoading: isLoading || userLoading || initLoading,
    mutate,
    isValidating,
  };
}
