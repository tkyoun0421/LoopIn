import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import useGetClientAuthToken from "@features/auth/hooks/useClientAuthToken";
import { searchItemsByKeyword } from "@features/playlist/api/searchItemsByKeyword";
import {
  SearchRequestParams,
  SearchResponse,
} from "@features/playlist/model/search";

const useSearchItemsByKeyword = (
  params: SearchRequestParams,
): UseInfiniteQueryResult<InfiniteData<SearchResponse>> => {
  const token = useGetClientAuthToken();

  return useInfiniteQuery({
    queryKey: ["search", params],
    queryFn: ({ pageParam = 0 }) => {
      if (!token) {
        throw new Error("token is not found");
      }
      return searchItemsByKeyword(token, { ...params, offset: pageParam });
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
