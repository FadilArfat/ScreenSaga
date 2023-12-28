import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getDetails, getSearch, getUpcoming } from "./api";

export function useNowPlaying() {
  return useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: getUpcoming,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    getPreviousPageParam: (firstPageParam) => {
      return firstPageParam <= 1 ? undefined : firstPageParam - 1;
    },
  });
}

export function useSearch(KeyWords) {
  return useInfiniteQuery({
    queryKey: ["search", KeyWords],
    queryFn: ({ pageParam = 1 }) =>
      getSearch({ keyword: KeyWords, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    getPreviousPageParam: (firstPageParam) => {
      return firstPageParam <= 1 ? undefined : firstPageParam - 1;
    },
    enabled: Boolean(KeyWords),
  });
}

export function useDetails(movieId) {
  return useQuery({
    queryKey: ["movieDetail", movieId],
    queryFn: () => getDetails({ movieId }),
  });
}
