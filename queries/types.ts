export type Pagination = {
  pageIndex: number;
  pageSize: number;
};

export interface ColumnSort {
  id: string;
  desc: boolean;
}

export type Sorting = ColumnSort[];

export interface ColumnFilter {
  id: string;
  value: unknown;
}

export type ColumnFilters = ColumnFilter[];
