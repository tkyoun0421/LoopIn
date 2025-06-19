import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import useClientAuthStore from "@features/auth/store/useClientAuthStore";
import getSearchForItem from "@features/search/api/getSearchForItem";
import {
  GetSearchForItemParams,
  SearchForItemResponse,
} from "@features/search/models/search";

import { LONG_CACHE_CONFIG } from "@shared/configs/cacheConfig";
import { generateQueryKey } from "@shared/tanstack-query/libs/keyFactories";
import { queryKey } from "@shared/tanstack-query/queryKey";

type UseGetInfiniteSearchForItemParams = Omit<
  GetSearchForItemParams,
  "offset"
> & {
  limit: number;
};

const useGetInfiniteSearchForItem = (
  params: UseGetInfiniteSearchForItemParams,
): UseInfiniteQueryResult<SearchForItemResponse, Error> => {
  const { clientAuthToken } = useClientAuthStore();
  const hasValidQuery = !!params.q?.trim();

  return useInfiniteQuery({
    queryKey: generateQueryKey(queryKey.searchForItem, params.q, params.type),
    queryFn: ({ pageParam = 0 }) =>
      getSearchForItem({
        ...params,
        offset: pageParam,
      }),
    enabled: !!clientAuthToken && hasValidQuery,
    ...LONG_CACHE_CONFIG,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const hasMoreTracks =
        lastPage.tracks &&
        lastPage.tracks.offset + lastPage.tracks.limit < lastPage.tracks.total;
      const hasMoreArtists =
        lastPage.artists &&
        lastPage.artists.offset + lastPage.artists.limit <
          lastPage.artists.total;
      const hasMoreAlbums =
        lastPage.albums &&
        lastPage.albums.offset + lastPage.albums.limit < lastPage.albums.total;

      if (hasMoreTracks || hasMoreArtists || hasMoreAlbums) {
        return allPages.length * params.limit;
      }
      return undefined;
    },
  });
};

export default useGetInfiniteSearchForItem;
