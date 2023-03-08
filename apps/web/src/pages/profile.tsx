import Card from "@/components/Card";
import ImageCard from "@/components/ImageCard";

import { SessionUser } from "shared-types";

const Profile = ({ user }: { user: SessionUser }) => {
  return (
    <>
      <div className="mx-auto container py-8 max-w-md">
        <Card>
          <div className="p-8 flex space-x-8">
            <img
              src={user.picture || "/noPfp.png"}
              height="96px"
              width="96px"
              className="rounded-full flex flex-col"
            />
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <p className="font-medium text-lg text-slate-200">
                  {user.name}
                </p>
                <p className="text-sm text-slate-400">
                  <span className="text-slate-300">Email:</span> {user.email}
                </p>
                <p className="text-sm text-slate-400">
                  <span className="text-slate-300">Logged in at:</span> {user.loggedInAt.toLocaleTimeString()} - {user.loggedInAt.toLocaleDateString()}
                </p>
                <p className="text-sm text-slate-400">
                  <span className="text-slate-300">Auth Provider:</span> {user.provider}.com
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;
