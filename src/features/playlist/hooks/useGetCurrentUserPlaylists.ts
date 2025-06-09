import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import getCurrentUserPlaylists from "@features/playlist/api/getCurrentUserPlaylists";
import {
  GetCurrentUserPlaylistsRequest,
  GetCurrentUserPlaylistsResponse,
} from "@features/playlist/model/playlist";

const useGetCurrentUserPlaylists = ({
  limit,
}: GetCurrentUserPlaylistsRequest): UseInfiniteQueryResult<
  InfiniteData<GetCurrentUserPlaylistsResponse>,
  Error
> => {
  return useInfiniteQuery({
    queryKey: ["currentUserPlaylists"],
    queryFn: ({ pageParam }) => {
      return getCurrentUserPlaylists({ limit, offset: pageParam });
    },
    getNextPageParam: lastPage => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const offset = url.searchParams.get("offset");
        return offset ? parseInt(offset) : 0;
      }
      return null;
    },
    initialPageParam: 0,
  });
};

export default useGetCurrentUserPlaylists;
