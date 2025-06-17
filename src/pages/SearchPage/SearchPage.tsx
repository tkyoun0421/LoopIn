import { JSX } from "react";

import Categories from "@features/categories/ui/Categories";
const SearchPage = (): JSX.Element => {
  return (
    <section className="flex flex-col gap-4">
      <Categories />
    </section>
  );
};

export default SearchPage;
