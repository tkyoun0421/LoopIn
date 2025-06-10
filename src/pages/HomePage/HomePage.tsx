import { JSX } from "react";

import NewReleases from "@features/albums/ui/NewReleases";

const HomePage = (): JSX.Element => {
  return (
    <div className="p-6">
      <NewReleases />
    </div>
  );
};

export default HomePage;
