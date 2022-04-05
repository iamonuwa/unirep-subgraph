import { Comment } from "../../generated/schema";
import { ADDRESS_ZERO } from "../utils/constants";

export function createOrLoadComment(id: string): Comment {
  let comment = Comment.load(id);
  if (comment === null) {
    comment = new Comment(id);
    comment.author = ADDRESS_ZERO;
    comment.post = ADDRESS_ZERO;
  }
  comment.save();
  return comment;
}
