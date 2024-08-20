import {
  queryOptions,
  useInfiniteQuery,
  usePrefetchQuery,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { z } from "zod";

const PostSchema = z.object({
  id: z.number(),
  type_of: z.string(),
  title: z.string(),
  description: z.string(),
  comments_count: z.number(),
});

async function fetchPosts(page: number) {
  const url = `https://dev.to/api/articles?per_page=10&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch posts for page #${page}`);
  }

  const json = await response.json();
  return z.array(PostSchema).parseAsync(json);
}

const keys = {
  all: ["posts"],
  list: (page: number) => [...keys.all, "list", { page }],
  infinite: () => [...keys.all, "list", "infinite"],
};

function postQueryOptions(page: number) {
  return queryOptions({
    queryKey: keys.list(page),
    queryFn: () => fetchPosts(page),
    staleTime: 10 * 1000,
  });
}

export function usePosts(page: number) {
  return useQuery(postQueryOptions(page));
}

export function usePostsInfinite() {
  return useInfiniteQuery({
    queryKey: keys.infinite(),
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    maxPages: 3,
    initialPageParam: 1,
    staleTime: 1000,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam <= 1) {
        return undefined;
      }

      return lastPageParam - 1;
    },
  });
}
