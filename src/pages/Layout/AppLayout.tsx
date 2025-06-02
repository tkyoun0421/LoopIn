import { JSX } from "react";
import { Outlet } from "react-router";

import SideBar from "@widgets/SideBar/SideBar";

const AppLayout = (): JSX.Element => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default AppLayout;
