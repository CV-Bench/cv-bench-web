import { ReactElement } from "react";
import Navbar from "./Navbar";

const NavLayout = ({ children }: { children: ReactElement<any, any> }) => (
  <>
    <div className="h-full flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-auto m-4">
        {children}
      </div>
    </div>
  </>
);

export default NavLayout;
