import * as Crypto from "crypto";
import { ObjectId } from "mongodb";

import { AccessType } from "shared-types";

export const isUsersOrPublic = (userId: string | ObjectId) => ({
  $or: [{ userId: new ObjectId(userId) }, { accessType: AccessType.PUBLIC }]
});

export const hashUserId = (openIdConnectId: string) => {
  return Crypto.createHash("shake256", { outputLength: 12 })
    .update(openIdConnectId)
    .digest("hex");
};
