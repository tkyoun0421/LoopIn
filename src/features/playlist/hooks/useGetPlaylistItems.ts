import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useParams } from "react-router";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import getPlaylistItems from "@features/playlist/api/getPlaylistItems";
import { PlaylistTrack } from "@features/playlist/model/playlist";

import { generateQueryKey } from "@shared/tanstack-query/libs/keyFactories";
import { queryKey } from "@shared/tanstack-query/queryKey";

const useGetPlaylistItems = (): UseInfiniteQueryResult<
  InfiniteData<PlaylistTrack>,
  Error
> => {
  const { id } = useParams();
  const { access_token } = useTokenStore();

  const LIMIT = 10;

  return useInfiniteQuery({
    queryKey: generateQueryKey(queryKey.playlistItems, id, access_token),
    queryFn: ({ pageParam = 0 }) =>
      getPlaylistItems({
        playlistId: id!,
        limit: LIMIT,
        offset: pageParam,
      }),
    getNextPageParam: (lastPage: PlaylistTrack) => {
      return lastPage.next ? (lastPage.offset || 0) + LIMIT : undefined;
    },
    initialPageParam: 0,
    enabled: !!id && !!access_token,
    gcTime: 5 * 60 * 1000,
  });
};

export default useGetPlaylistItems;
