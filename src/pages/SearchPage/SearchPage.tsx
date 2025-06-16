import { JSX } from "react";

import Categories from "@features/categories/ui/Categories";
import SearchBar from "@features/search/ui/SearchBar";

const SearchPage = (): JSX.Element => {
  return (
    <main className="bg-[hsl(var(--secondary))] p-6">
      <SearchBar />
      <Categories />
    </main>
  );
};

export default SearchPage;
