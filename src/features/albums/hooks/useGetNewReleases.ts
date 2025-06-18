import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getNewReleases } from "@features/albums/api/getNewReleases";
import { generateQueryKey } from "@features/albums/libs/queryKeyFactories";
import { GetNewReleasesResponse } from "@features/albums/model/albums";
import useClientAuthToken from "@features/auth/hooks/useClientAuthToken";

import { MEDIUM_CACHE_CONFIG } from "@shared/configs/cacheConfig";
import { NEW_RELEASES_ENDPOINT } from "@shared/configs/env";

const useGetNewReleases = (): UseQueryResult<
  GetNewReleasesResponse | undefined
> => {
  const clientAuthToken = useClientAuthToken();

  return useQuery({
    enabled: !!clientAuthToken,
    queryKey: generateQueryKey(clientAuthToken!),
    queryFn: async () => {
      return getNewReleases(NEW_RELEASES_ENDPOINT);
    },
    ...MEDIUM_CACHE_CONFIG,
  });
};

export default useGetNewReleases;
