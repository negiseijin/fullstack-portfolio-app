import useSWRInfinite from "swr/infinite";

import { client } from "@/lib/utils";

const fetcher = async (commentId: string) => {
  try {
    const res = await client.comments[":commentId"].$get({
      param: { commentId: commentId },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export function useComments() {
  const {
    data: comment,
    error,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading,
  } = useSWRInfinite((index) => `${index + 1}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const issues = comment ? [...comment] : [];
  const isLoadingMore =
    isLoading ||
    (size > 0 && comment && typeof comment[size - 1] === "undefined");
  // const isEmpty = comments?.length === 0;
  // const isReachingEnd = isEmpty || (comment && comment.length < PAGE_SIZE);
  // const isRefreshing = isValidating && comment && comment.length === size;

  return {
    comment: issues,
    isError: error,
    isLoading,
    mutate,
    setSize,
    isValidating,
  };
}
