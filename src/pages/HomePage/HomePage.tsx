import { JSX, useEffect } from "react";

import NewReleases from "@features/albums/ui/NewReleases";
import useGetCurrentUserProfile from "@features/user/hooks/useGetCurrentUserProfile";

const HomePage = (): JSX.Element => {
  const { data } = useGetCurrentUserProfile();

  useEffect(() => {
    if (data) {
      console.log("data: ", data);
    }
  }, [data]);

  return (
    <>
      <NewReleases />
    </>
  );
};

export default HomePage;
