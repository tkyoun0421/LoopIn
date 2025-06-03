import { JSX, Suspense } from "react";
import { Outlet } from "react-router";

import SideBar from "@widgets/SideBar/SideBar";

const AppLayout = (): JSX.Element => {
  return (
    <>
      <Suspense fallback={"loading..."}>
        <SideBar />
        <Outlet />
      </Suspense>
    </>
  );
};

export default AppLayout;
