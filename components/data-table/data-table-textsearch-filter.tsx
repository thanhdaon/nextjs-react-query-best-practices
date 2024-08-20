import { Table } from "@tanstack/react-table";
import { Input } from "~/components/ui/input";

interface Props<TData> {
  table: Table<TData>;
  label: string;
  field: keyof TData;
  placeholder?: string;
}

export function DataTableTextSearchFilter<TData>({
  table,
  field,
  placeholder,
}: Props<TData>) {
  const column = table.getColumn(String(field));

  if (column === undefined) {
    return;
  }

  return (
    <Input
      key={String(field)}
      placeholder={placeholder}
      value={String(column.getFilterValue() || "")}
      onChange={(e) => column.setFilterValue(e.target.value)}
      className="h-8 w-40 lg:w-64"
    />
  );
}
