"use client";

import { parseAsArrayOf, parseAsString, UseQueryStatesKeysMap } from "nuqs";
import { columns } from "~/app/tasks/task-columns";
import { DataTable } from "~/components/data-table/data-table";
import { DataTableFacetedFilter } from "~/components/data-table/data-table-faceted-filter";
import { DataTableTextSearchFilter } from "~/components/data-table/data-table-textsearch-filter";
import {
  DataTableToolbar,
  DataTableToolbarRight,
} from "~/components/data-table/data-table-toolbar";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { useDataTable } from "~/components/data-table/use-data-table";
import { useDataTableParams } from "~/components/data-table/use-data-table-params";
import { DataTableSkeleton } from "~/components/date-table-skeleton";
import { useTasks } from "~/queries/tasks";

const filterDefs: UseQueryStatesKeysMap = {
  status: parseAsArrayOf(parseAsString),
  title: parseAsString,
};

export function TasksTable() {
  const { pagination, sorting, columnFilters } = useDataTableParams(filterDefs);

  const tasks = useTasks({ pagination, sorting, columnFilters });

  const table = useDataTable({
    filterDefs,
    columns,
    data: tasks.data?.data || [],
    rowCount: tasks.data?.total || -1,
  });

  if (tasks.isError) {
    console.log(tasks.error);
  }

  if (tasks.data) {
    return (
      <DataTable table={table} isFetching={tasks.isFetching}>
        <DataTableToolbar>
          <DataTableToolbarRight>
            <DataTableTextSearchFilter
              table={table}
              label="Title"
              field="title"
              placeholder="Filter titles..."
            />
            <DataTableFacetedFilter
              table={table}
              label="Status"
              field="status"
              options={[
                { label: "Todo", value: "todo" },
                { label: "In-progress", value: "in-progress" },
                { label: "Done", value: "done" },
                { label: "Canceled", value: "canceled" },
              ]}
            />
          </DataTableToolbarRight>
          <DataTableToolbarRight>
            <DataTableViewOptions table={table} />
          </DataTableToolbarRight>
        </DataTableToolbar>
      </DataTable>
    );
  }

  return (
    <DataTableSkeleton
      columnCount={5}
      searchableColumnCount={1}
      filterableColumnCount={2}
      cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
      shrinkZero
    />
  );
}
