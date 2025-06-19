import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import { searchItemsByKeyword } from "@features/playlist/api/searchItemsByKeyword";
import {
  SearchRequestParams,
  SearchResponse,
} from "@features/playlist/model/search";

import { generateQueryKey } from "@shared/tanstack-query/libs/keyFactories";
import { queryKey } from "@shared/tanstack-query/queryKey";

const useSearchItemsByKeyword = (
  params: SearchRequestParams,
): UseInfiniteQueryResult<InfiniteData<SearchResponse>> => {
  const { access_token } = useTokenStore();

  return useInfiniteQuery({
    queryKey: generateQueryKey(queryKey.search, params),
    queryFn: ({ pageParam = 0 }) => {
      return searchItemsByKeyword({
        ...params,
        offset: pageParam,
      });
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const nextPageUrl =
        lastPage.tracks?.next ||
        lastPage.albums?.next ||
        lastPage.playlists?.next ||
        lastPage.shows?.next ||
        lastPage.episodes?.next ||
        lastPage.audiobooks?.next;

      if (nextPageUrl) {
        const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }

      return undefined;
    },
    enabled: !!params.q && !!access_token,
  });
};

export default useSearchItemsByKeyword;
