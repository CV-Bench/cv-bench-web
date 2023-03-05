import { ReactElement } from "react";

import { SessionUser } from "shared-types";

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
      {children}
    </div>
  </>
);

export default NavLayout;
