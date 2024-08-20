import {
  keepPreviousData,
  queryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { z } from "zod";

const RepoSchema = z.object({
  id: z.number(),
  full_name: z.string(),
});

async function fetchRepos(sort: string, page: number) {
  const endpoint = `https://api.github.com/orgs/TanStack/repos?sort=${sort}&per_page=4&page=${page}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  const json = await response.json();
  return z.array(RepoSchema).parseAsync(json);
}

const keys = {
  all: ["repos"],
  list: (sort: string, page: number) => [...keys.all, "list", { sort, page }],
};

function reposQueryOptions(sort: string, page: number) {
  return queryOptions({
    queryKey: keys.list(sort, page),
    queryFn: () => fetchRepos(sort, page),
    staleTime: 10 * 1000,
  });
}

export function useRepos(sort: string, page: number) {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(reposQueryOptions(sort, page + 1));
  }, [sort, page, queryClient]);

  return useQuery({
    ...reposQueryOptions(sort, page),
    placeholderData: keepPreviousData,
  });
}
