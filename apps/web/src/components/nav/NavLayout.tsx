import { ReactElement } from "react";

import { SessionUser } from "types";

import Navbar from "./Navbar";

const NavLayout = ({
  children,
  user
}: {
  children: ReactElement<any, any>;
  user: SessionUser;
}) => (
  <>
    <div className="h-full flex flex-col">
      <Navbar user={user} />
      <div className="flex-1 overflow-auto m-4">{children}</div>
    </div>
  </>
);

export default NavLayout;
