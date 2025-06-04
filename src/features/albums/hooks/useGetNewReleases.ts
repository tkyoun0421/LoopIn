import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getNewReleases } from "@features/albums/api/getNewReleases";
import { AlbumsResponse } from "@features/albums/model/albums";
import useClientAuthToken from "@features/auth/hooks/useClientAuthToken";

import { newReleasesEndpoint } from "@shared/configs/env";

const useGetNewReleases = (): UseQueryResult<AlbumsResponse | undefined> => {
  const clientAuthToken = useClientAuthToken();

  return useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      if (clientAuthToken) {
        return getNewReleases(newReleasesEndpoint, clientAuthToken);
      }
    },
    enabled: !!clientAuthToken,
  });
};

export default useGetNewReleases;
