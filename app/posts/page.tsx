import { Posts } from "~/app/posts/posts";
import { PostsLoading } from "~/app/posts/posts-loading";

export default function RepoPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Posts />
      <PostsLoading />
    </div>
  );
}
