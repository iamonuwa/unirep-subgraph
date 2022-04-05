import { Airdrop } from "../../generated/schema";
import { ADDRESS_ZERO } from "../utils/constants";

export function createOrLoadAirdrop(id: string): Airdrop {
  let airdrop = Airdrop.load(id);
  if (airdrop === null) {
    airdrop = new Airdrop(id);
    airdrop.id = id;
    airdrop.receipient = ADDRESS_ZERO;
  }
  airdrop.save();
  return airdrop;
}
