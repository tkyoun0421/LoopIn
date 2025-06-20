import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import getCurrentUserPlaylists from "@features/playlist/api/getCurrentUserPlaylists";
import {
  GetCurrentUserPlaylistsRequest,
  GetCurrentUserPlaylistsResponse,
} from "@features/playlist/model/playlist";

import { generateQueryKey } from "@shared/tanstack-query/libs/keyFactories";
import { queryKey } from "@shared/tanstack-query/queryKey";

const useGetCurrentUserPlaylists = ({
  limit,
}: GetCurrentUserPlaylistsRequest): UseInfiniteQueryResult<
  InfiniteData<GetCurrentUserPlaylistsResponse>,
  Error
> => {
  const { access_token } = useTokenStore();

  return useInfiniteQuery({
    queryKey: generateQueryKey(queryKey.currentUserPlaylists),
    queryFn: ({ pageParam }) =>
      getCurrentUserPlaylists({ limit, offset: pageParam }),
    getNextPageParam: lastPage => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const offset = url.searchParams.get("offset");
        return offset ? parseInt(offset) : 0;
      }
      return null;
    },
    initialPageParam: 0,
    enabled: !!access_token,
  });
};

export default useGetCurrentUserPlaylists;
