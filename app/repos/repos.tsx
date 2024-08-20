"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRepos } from "~/app/repos/queries";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export function Repos() {
  const [selection, setSelection] = useState("created");
  const [page, setPage] = useState(1);

  const handleSort = (sort: string) => {
    setSelection(sort);
    setPage(1);
  };

  return (
    <div className="grid gap-4">
      <Sort value={selection} onSort={handleSort} />
      <RepoList sort={selection} page={page} setPage={setPage} />
    </div>
  );
}

function RepoList({
  sort,
  page,
  setPage,
}: {
  sort: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const { data, status, isPlaceholderData } = useRepos(sort, page);

  if (status === "pending") {
    return <div>...</div>;
  }

  if (status === "error") {
    return <div>There was an error fetching the repos.</div>;
  }

  return (
    <div>
      <Table className="rounded-md border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((repo) => (
            <TableRow key={repo.id}>
              <TableCell className="font-medium">{repo.full_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        <Button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1 || isPlaceholderData}
        >
          Previous
        </Button>
        <span className="px-4">Page {page}</span>
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={isPlaceholderData}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function Sort({
  value,
  onSort,
}: {
  value: string;
  onSort: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onSort}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="created">Created</SelectItem>
        <SelectItem value="updated">Updated</SelectItem>
        <SelectItem value="pushed">Pushed</SelectItem>
        <SelectItem value="full_name">Name</SelectItem>
      </SelectContent>
    </Select>
  );
}
