import {
  AirdropSubmitted as AirdropSubmittedEvent,
  CommentSubmitted as CommentSubmittedEvent,
  PostSubmitted as PostSubmittedEvent,
  UserSignedUp as UserSignUpEvent,
  VoteSubmitted as VoteSubmittedEvent,
} from "../../generated/Unirep/Unirep";
import { createOrLoadAirdrop } from "../entities/Airdrop";
import { createOrLoadComment } from "../entities/Comment";
import { createOrLoadPost } from "../entities/Post";
import { createOrLoadUser } from "../entities/User";
import { createOrLoadVote } from "../entities/Vote";
import { buildId } from "../utils/buildId";

export function handleUserSignedUp(event: UserSignUpEvent): void {
  const user = createOrLoadUser(event.transaction.from);

  user.epochKey = event.params._epoch.toString();
  user.createdAt = event.block.timestamp;

  user.save();
}

export function handlePostSubmitted(event: PostSubmittedEvent): void {
  const id = buildId(event);
  const post = createOrLoadPost(id);

  post.author = createOrLoadUser(event.transaction.from).id;
  post.id = id;
  post.content = event.params._postContent;
  post.createdAt = event.block.timestamp;

  post.save();
}

export function handleCommentSubmitted(event: CommentSubmittedEvent): void {
  const id = buildId(event);
  const comment = createOrLoadComment(id);

  comment.id = id;
  comment.author = createOrLoadUser(event.transaction.from).id;
  comment.comment = event.params._commentContent;
  comment.post = createOrLoadPost(event.params._postId.toString()).id;
  comment.createdAt = event.block.timestamp;

  comment.save();
}

export function handleAirdropSubmitted(event: AirdropSubmittedEvent): void {
  const id = buildId(event);
  const airdrop = createOrLoadAirdrop(id);

  airdrop.id = id;
  airdrop.receipient = createOrLoadUser(event.transaction.from).id;
  airdrop.createdAt = event.block.timestamp;

  airdrop.save();
}

export function handleVoteSubmitted(event: VoteSubmittedEvent): void {
  const id = buildId(event);
  const vote = createOrLoadVote(id);

  vote.user = createOrLoadUser(event.transaction.from).id;
  vote.up = event.params.upvoteValue;
  vote.down = event.params.downvoteValue;
  vote.createdAt = event.block.timestamp;

  vote.save();
}
