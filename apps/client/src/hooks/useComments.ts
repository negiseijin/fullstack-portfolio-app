import useSWR from "swr";

import { client } from "@/lib/utils";
import useSWRInfinite from "swr/infinite";

const key = "comments" as const;
const PAGE_SIZE = 20;

const fetcher = async () => {
  try {
    const res = await client.comments.$get();
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

const fetcher2 = async (commentId: string) => {
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
    data: comments,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // const { data, mutate, size, setSize, isValidating, isLoading } =
  const {
    data: comment,
    size,
    setSize,
  } = useSWRInfinite((index) => `${index + 1}`, fetcher2, {
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
    comments: comments,
    comment: issues,
    isError: error,
    isLoading,
    mutate,
    setSize,
    isValidating,
  };
}
