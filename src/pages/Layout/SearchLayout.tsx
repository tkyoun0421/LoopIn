import { JSX, Suspense } from "react";
import { Outlet } from "react-router";

import LoadingPage from "@pages/LoadingPage/LoadingPage";

import SearchBar from "@features/search/ui/SearchBar";

import ScrollToTop from "@shared/lib/utils/ScrollToTop";

const SearchLayout = (): JSX.Element => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ScrollToTop />
      <section className="min-h-screen bg-[hsl(var(--secondary))] p-4 lg:p-6">
        <SearchBar />
        <Outlet />
      </section>
    </Suspense>
  );
};

export default SearchLayout;
