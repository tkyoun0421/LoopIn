import { JSX } from "react";
import { Outlet } from "react-router";

import SearchBar from "@features/search/ui/SearchBar";

const SearchLayout = (): JSX.Element => {
  return (
    <>
      <main className="bg-[hsl(var(--secondary))] p-6">
        <SearchBar />
        <Outlet />
      </main>
    </>
  );
};

export default SearchLayout;
