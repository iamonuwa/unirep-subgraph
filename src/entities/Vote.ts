import { Vote } from "../../generated/schema";

export function createOrLoadVote(id: string): Vote {
  let vote = Vote.load(id);

  if (vote === null) {
    vote = new Vote(id);
  }

  vote.id = id;
  vote.save();

  return vote;
}
