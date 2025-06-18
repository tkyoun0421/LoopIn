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
    queryKey: ["infiniteSearchForItem", params],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientAuthToken) {
        throw new Error("토큰을 사용할 수 없습니다.");
      }
      return getSearchForItem(clientAuthToken, {
        ...params,
        offset: pageParam,
      });
    },
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
