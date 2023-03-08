/* eslint-disable @next/next/no-img-element */
import Card from "@/components/Card";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import { formatToDateString } from "@/utils/date";

import { SessionUser } from "shared-types";

const Profile = ({ user }: { user: SessionUser }) => {
  return (
    <>
      <div className="mx-auto container max-w-xl w-full py-8 grid grid-cols-3 gap-4">
        <Card className="p-8 space-y-8">
          <div className="w-full px-4">
            <div className="rounded-full overflow-hidden">
              <img
                src={user.picture || "/noPfp.png"}
                className="object-cover w-full"
                alt="Users profile image"
              />
            </div>
          </div>
          <div className="items-center flex flex-col">
            <p className="text-xs text-slate-400">Logged in as</p>
            <p className="text-center text-lg text-slate-200">{user.name}</p>
          </div>
        </Card>
        <Card className="col-span-2 p-4 text-slate-200 divide-y divide-slate-600">
          <p className="text-slate-200 pb-4">General Infos</p>
          <div className="py-4 space-y-2">
            <div className="grid grid-cols-2">
              <InputLabel className="text-slate-400">Email</InputLabel>
              <InputField
                type="text"
                readOnly
                value={user.email}
                className="text-slate-200 py-1 bg-transparent px-0"
              />
            </div>
            <div className="grid grid-cols-2">
              <InputLabel className="text-slate-400">Logged in at</InputLabel>
              <InputField
                type="text"
                readOnly
                value={formatToDateString(user.loggedInAt)}
                className="text-slate-200 py-1 bg-transparent px-0"
              />
            </div>
            <div className="grid grid-cols-2">
              <InputLabel className="text-slate-400">Auth Provider</InputLabel>
              <InputField
                type="text"
                readOnly
                value={user.provider}
                className="text-slate-200 py-1 bg-transparent px-0"
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;
