import { JSX, Suspense } from "react";
import { Outlet } from "react-router";

import LoadingPage from "@pages/LoadingPage/LoadingPage";

import Header from "@widgets/Header/Header";
import SideBar from "@widgets/SideBar/SideBar";

const AppLayout = (): JSX.Element => {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <Header />
        <div className="container flex">
          <SideBar />
          <main className="min-h-screen flex-1">
            <div className="max-m-7xl mx-auto h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </Suspense>
    </>
  );
};

export default AppLayout;
