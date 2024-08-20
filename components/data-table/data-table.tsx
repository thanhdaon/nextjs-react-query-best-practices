"use client";

import {
  Column,
  flexRender,
  type Table as TanstackTable,
} from "@tanstack/react-table";
import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/components/ui/utils";
import { DataTablePagination } from "~/components/data-table/data-table-pagination";

interface DataTableProps<TData> extends HTMLAttributes<HTMLDivElement> {
  table: TanstackTable<TData>;
  floatingBar?: ReactNode | null;
  isFetching?: boolean;
}

export function DataTable<TData>({
  className,
  table,
  children,
  floatingBar,
  isFetching,
}: DataTableProps<TData>) {
  return (
    <div className={cn("w-full space-y-2.5 overflow-auto", className)}>
      {children}
      <div className="overflow-hidden rounded-md border relative">
        {isFetching && (
          <div className="h-0.5 w-full bg-primary absolute inset-x-0 top-0">
            <div className="animate-progress w-full h-full bg-secondary origin-left-right"></div>
          </div>
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        ...getCommonPinningStyles({ column: header.column }),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        ...getCommonPinningStyles({ column: cell.column }),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}
      </div>
    </div>
  );
}

function getCommonPinningStyles<TData>({
  column,
}: {
  column: Column<TData>;
}): CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-5px 0 5px -5px hsl(var(--border)) inset"
      : isFirstRightPinnedColumn
      ? "5px 0 5px -5px hsl(var(--border)) inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? "sticky" : "relative",
    background: isPinned ? "hsl(var(--background))" : undefined,
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
}
