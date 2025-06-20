import { JSX } from "react";

import NewReleases from "@features/albums/ui/NewReleases";
import YearEndSummary from "@features/search/ui/YearEnd/YearEndSummary";

const HomePage = (): JSX.Element => {
  return (
    <main className="p-4 lg:p-6">
      <NewReleases />
      <YearEndSummary />
    </main>
  );
};

export default HomePage;
