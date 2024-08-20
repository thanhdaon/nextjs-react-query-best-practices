"use client";

import { usePostsInfinite } from "~/app/posts/queries";

export function PostsLoading() {
  const { isFetching } = usePostsInfinite();

  if (isFetching) {
    return "Loading...";
  }

  return "ok";
}
