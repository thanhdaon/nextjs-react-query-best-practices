import {
  createParser,
  parseAsInteger,
  useQueryState,
  useQueryStates,
  UseQueryStatesKeysMap,
} from "nuqs";

type Sorting = {
  id: string;
  desc: boolean;
}[];

type ColumnFilters = {
  id: string;
  value: unknown;
}[];

const parseAsSort = createParser<Sorting>({
  parse(queryValue) {
    return queryValue.split(";").map((sortColum) => {
      const [id, direction] = sortColum.split(".");
      return { id, desc: direction === "desc" };
    });
  },
  serialize(sorting) {
    return sorting
      .map((sort) => `${sort.id}.${sort.desc ? "desc" : "asc"}`)
      .join(";");
  },
});

export function useDataTableParams(filterDefs?: UseQueryStatesKeysMap) {
  const [sorting, setSort] = useQueryState("sort", parseAsSort.withDefault([]));
  const [filterParams, setFilterParams] = useQueryStates(filterDefs || {});
  const [pagination, setPagination] = useQueryStates({
    pageIndex: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
  });

  return {
    sorting,
    setSorting: setSort,
    pagination,
    setPagination,
    columnFilters: Object.entries(filterParams).map(([id, value]) => ({
      id,
      value,
    })),
    setColumnFilters: (columnFilters: ColumnFilters) => {
      if (filterDefs === undefined) {
        return;
      }

      const filters: Record<string, unknown> = {};

      Object.keys(filterDefs).forEach((k) => {
        filters[k] = null;
      });

      columnFilters.forEach((f) => {
        filters[f.id] = f.value;
      });

      setFilterParams(filters);
    },
  };
}
