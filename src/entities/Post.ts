import { Post } from "../../generated/schema";

export function createOrLoadPost(id: string): Post {
  let post = Post.load(id);

  if (post === null) {
    post = new Post(id);
  }

  post.save();
  return post;
}
