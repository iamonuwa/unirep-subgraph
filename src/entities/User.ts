import { Address } from "@graphprotocol/graph-ts";
import { User } from "../../generated/schema";

export function createOrLoadUser(address: Address): User {
  let user = User.load(address.toHex());

  if (user === null) {
    user = new User(address.toHex());
  }

  user.id = address.toHex();
  user.save();

  return user;
}
