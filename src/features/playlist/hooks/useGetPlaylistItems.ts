import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useParams } from "react-router";

import getPlaylistItems from "@features/playlist/api/getPlaylistItems";
import { PlaylistTrack } from "@features/playlist/model/playlist";

const useGetPlaylistItems = (): UseInfiniteQueryResult<
  InfiniteData<PlaylistTrack>,
  Error
> => {
  const { id } = useParams();
  const LIMIT = 10;

  return useInfiniteQuery({
    queryKey: ["playlist-items", id],
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
    enabled: !!id,
  });
};

export default useGetPlaylistItems;
