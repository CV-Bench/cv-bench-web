import { ReactElement } from "react";
import Navbar from "./Navbar";

const NavLayout = ({ children }: { children: ReactElement<any, any> }) => (
  <>
    <Navbar />

    {children}
  </>
);

export default NavLayout;
