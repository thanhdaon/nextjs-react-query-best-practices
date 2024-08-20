"use client";

import {
  functionalUpdate,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type TableOptions,
} from "@tanstack/react-table";
import { UseQueryStatesKeysMap } from "nuqs";
import { useDataTableParams } from "~/components/data-table/use-data-table-params";

type DataTableOptions<TData> = Omit<
  TableOptions<TData>,
  | "getCoreRowModel"
  | "enableRowSelection"
  | "getFilteredRowModel"
  | "getPaginationRowModel"
  | "getSortedRowModel"
  | "manualFiltering"
  | "manualPagination"
  | "manualSorting"
  | "onPaginationChange"
  | "onSortingChange"
  | "onColumnFiltersChange"
>;

interface UseDataTableProps<TData> extends DataTableOptions<TData> {
  filterDefs?: UseQueryStatesKeysMap;
}

export function useDataTable<TData>(props: UseDataTableProps<TData>) {
  const {
    pagination,
    sorting,
    columnFilters,
    setPagination,
    setSorting,
    setColumnFilters,
  } = useDataTableParams(props.filterDefs);

  return useReactTable({
    ...props,
    enableRowSelection: true,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination,
      sorting,
      columnFilters,
    },
    onPaginationChange: (updater) => {
      const updated = functionalUpdate(updater, pagination);
      setPagination(updated);
    },
    onSortingChange: (updater) => {
      const updated = functionalUpdate(updater, sorting);
      setSorting(updated);
    },
    onColumnFiltersChange: (updater) => {
      const updated = functionalUpdate(updater, columnFilters);
      setColumnFilters(updated);
    },
  });
}
