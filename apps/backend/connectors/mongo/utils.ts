import { ObjectId } from "mongodb";
import { AccessType } from "types";
import * as Crypto from "crypto";

export const isUsersOrPublic = (userId: string | ObjectId) => ({
  $or: [{ userId: new ObjectId(userId) }, { accessType: AccessType.PUBLIC }],
});

export const hashUserId = (openIdConnectId: string) => {
  return Crypto.createHash("shake256", { outputLength: 24 })
    .update(openIdConnectId)
    .digest("hex");
};
