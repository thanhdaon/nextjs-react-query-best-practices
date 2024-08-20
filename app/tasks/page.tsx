import { Suspense } from "react";
import { TasksTable } from "~/app/tasks/task-table";
import { DataTableSkeleton } from "~/components/date-table-skeleton";
import { Shell } from "~/components/shell";

const tableFallback = (
  <DataTableSkeleton
    columnCount={5}
    searchableColumnCount={1}
    filterableColumnCount={2}
    cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
    shrinkZero
  />
);

async function TaskPage() {
  return (
    <Shell className="gap-2">
      <Suspense fallback={tableFallback}>
        <TasksTable />
      </Suspense>
    </Shell>
  );
}

export default TaskPage;
