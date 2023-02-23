import { ObjectId } from "mongodb";
import { AccessType } from "types";

export const isUsersOrPublic = (userId: string | ObjectId) => ({
  $or: [{ userId: new ObjectId(userId) }, { accessType: AccessType.PUBLIC }],
});
