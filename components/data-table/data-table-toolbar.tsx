"use client";

import { HTMLAttributes } from "react";
import { cn } from "~/components/ui/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function DataTableToolbar({ children, className }: Props) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between space-x-2 overflow-auto p-1",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DataTableToolbarLeft({ children, className }: Props) {
  return (
    <div className={cn("flex flex-1 items-center space-x-2", className)}>
      {children}
    </div>
  );
}

export function DataTableToolbarRight({ children, className }: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
  );
}
