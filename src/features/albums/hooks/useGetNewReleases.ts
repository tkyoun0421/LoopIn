import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getNewReleases } from "@features/albums/api/getNewReleases";
import { GetNewReleasesResponse } from "@features/albums/model/albums";
import useClientAuthToken from "@features/auth/hooks/useClientAuthToken";

import { MEDIUM_CACHE_CONFIG } from "@shared/configs/cacheConfig";
import { NEW_RELEASES_ENDPOINT } from "@shared/configs/env";

const useGetNewReleases = (): UseQueryResult<
  GetNewReleasesResponse | undefined
> => {
  const clientAuthToken = useClientAuthToken();

  return useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      if (!clientAuthToken) {
        throw new Error("fail to fetch client auth token.");
      }

      return getNewReleases(NEW_RELEASES_ENDPOINT, clientAuthToken);
    },
    enabled: !!clientAuthToken,
    ...MEDIUM_CACHE_CONFIG,
  });
};

export default useGetNewReleases;
