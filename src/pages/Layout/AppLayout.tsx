import { JSX, Suspense } from "react";
import { Outlet } from "react-router";

import LoadingPage from "@pages/LoadingPage/LoadingPage";

import Header from "@widgets/Header/Header";
import MobileFooter from "@widgets/MobileFooter/MobileFooter";
import SideBar from "@widgets/SideBar/SideBar";

import ScrollToTop from "@shared/lib/utils/ScrollToTop";

const AppLayout = (): JSX.Element => {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <ScrollToTop />
        <Header />
        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-screen-xl">
            <SideBar />
            <main className="min-h-screen flex-1 pb-20 lg:pb-0">
              <div className="mx-auto h-full max-w-screen-lg">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
        <MobileFooter />
      </Suspense>
    </>
  );
};

export default AppLayout;
