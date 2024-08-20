"use client";

import { usePostsInfinite } from "~/app/posts/queries";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

export function Posts() {
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = usePostsInfinite();

  const [ref, entry] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage]);

  if (status === "pending") {
    return "...";
  }

  if (status === "error") {
    return <pre>{JSON.stringify(error, null, " ")}</pre>;
  }

  return (
    <ScrollArea className="h-72 w-[600px] rounded-md border p-2">
      {data.pages.flat().map((post, index, pages) => (
        <>
          <div key={post.id} className="text-sm">
            {post.title}
          </div>
          <Separator className="my-2" />
          {index === pages.length - 2 && <div ref={ref} />}
        </>
      ))}
    </ScrollArea>
  );
}
