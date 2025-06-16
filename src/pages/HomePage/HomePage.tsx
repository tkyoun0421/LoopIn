import { JSX } from "react";

import NewReleases from "@features/albums/ui/NewReleases";

const HomePage = (): JSX.Element => {
  return (
    <main className="p-6">
      <NewReleases />
    </main>
  );
};

export default HomePage;
