import { ReactElement } from "react";
import { SessionUser } from "types";
import Navbar from "./Navbar";

const NavLayout = ({ children, user }: { children: ReactElement<any, any>, user:SessionUser }) => (
  <>
    <Navbar user={user}/>

    {children}
  </>
);

export default NavLayout;
