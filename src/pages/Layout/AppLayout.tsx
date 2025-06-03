import { JSX, Suspense } from "react";
import { Outlet } from "react-router";

import LoadingPage from "@pages/LoadingPage/LoadingPage";

import Header from "@features/components/Header/Header";
import SideBar from "@features/components/SideBar/SideBar";

const AppLayout = (): JSX.Element => {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <Header />
        <div className="container flex">
          <SideBar />
          <main className="min-h-screen flex-1 p-6">
            <div className="max-m-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </Suspense>
    </>
  );
};

export default AppLayout;
