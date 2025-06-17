import { JSX, Suspense } from "react";
import { Outlet } from "react-router";

import LoadingPage from "@pages/LoadingPage/LoadingPage";

import SearchBar from "@features/search/ui/SearchBar";

const SearchLayout = (): JSX.Element => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <section className="min-h-screen bg-[hsl(var(--secondary))] p-6">
        <SearchBar />
        <Outlet />
      </section>
    </Suspense>
  );
};

export default SearchLayout;
