import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { unstable_noStore } from "next/cache";
import { z } from "zod";
import { createPaginationResponseSchema } from "~/queries/helpers";
import { ColumnFilters, Pagination, Sorting } from "~/queries/types";

const TaskSchema = z.object({
  id: z.number(),
  code: z.string(),
  title: z.string().nullable(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
});

export type Task = z.input<typeof TaskSchema>;

const TasksResponse = createPaginationResponseSchema(TaskSchema.array());

type TaskParams = {
  pagination?: Pagination;
  sorting: Sorting;
  columnFilters: ColumnFilters;
};

async function fetchTasks(inputs: TaskParams) {
  unstable_noStore();

  const params = new URLSearchParams();
  if (inputs.pagination) {
    params.set("page", inputs.pagination.pageIndex.toString());
    params.set("pageSize", inputs.pagination.pageSize.toString());
  }

  const sorting = inputs.sorting.at(0);
  if (sorting) {
    params.set("sort", sorting.id);
    params.set("direction", sorting.desc ? "desc" : "asc");
  }

  inputs.columnFilters.forEach((f) => {
    if (typeof f.value === "string") {
      params.set(f.id, f.value);
    }

    if (Array.isArray(f.value)) {
      params.set(f.id, f.value.join("."));
    }
  });

  const endpoint = `https://hono-showcase.vercel.app/api/tasks?${params.toString()}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  const json = await response.json();
  const paginationResponse = await TasksResponse.parseAsync(json);

  return paginationResponse;
}

const keys = {
  all: ["tasks"],
  list: (inputs: TaskParams) => [...keys.all, "list", inputs],
};

export function useTasks(inputs: TaskParams) {
  return useQuery({
    queryKey: keys.list(inputs),
    queryFn: () => fetchTasks(inputs),
    staleTime: 5_000,
    gcTime: 60_000,
    placeholderData: keepPreviousData,
  });
}
