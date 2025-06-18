import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import useClientAuthStore from "@features/auth/store/useClientAuthStore";
import { searchItemsByKeyword } from "@features/playlist/api/searchItemsByKeyword";
import {
  SearchRequestParams,
  SearchResponse,
} from "@features/playlist/model/search";

const useSearchItemsByKeyword = (
  params: SearchRequestParams,
): UseInfiniteQueryResult<InfiniteData<SearchResponse>> => {
  const { clientAuthToken } = useClientAuthStore();

  return useInfiniteQuery({
    queryKey: ["search", params],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientAuthToken) {
        throw new Error("clientAuthToken is not found");
      }
      return searchItemsByKeyword(clientAuthToken, {
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
    enabled: !!params.q,
  });
};

export default useSearchItemsByKeyword;
