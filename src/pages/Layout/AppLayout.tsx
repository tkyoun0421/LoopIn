import { JSX, Suspense } from "react";
import { Outlet } from "react-router";

import Header from '@widgets/Header/Header';
import SideBar from "@widgets/SideBar/SideBar";

const AppLayout = (): JSX.Element => {
  return (
    <>
      <Suspense fallback={"loading..."}>
        <Header />
        <SideBar />
        <Outlet />
      </Suspense>
    </>
  );
};

export default AppLayout;
