import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import getPlaylistItems from "@features/playlist/api/getPlaylistItems";
import { PlaylistTrack } from "@features/playlist/model/playlist";

const useGetPlaylistItems = (): UseInfiniteQueryResult<
  InfiniteData<PlaylistTrack>,
  Error
> => {
  const { id } = useParams();
  const { access_token } = useTokenStore();
  const queryClient = useQueryClient();
  const previousIdRef = useRef<string | undefined>(undefined);
  const LIMIT = 10;

  useEffect(() => {
    if (previousIdRef.current && previousIdRef.current !== id) {
      queryClient.removeQueries({
        queryKey: ["playlist-items", previousIdRef.current],
      });
    }
    previousIdRef.current = id;
  }, [id, queryClient]);

  return useInfiniteQuery({
    queryKey: ["playlist-items", id, access_token],
    queryFn: ({ pageParam = 0 }) => {
      if (!id) throw new Error("Playlist ID is required");
      if (!access_token) throw new Error("Access token is required");

      return getPlaylistItems({
        playlistId: id,
        limit: LIMIT,
        offset: pageParam,
      });
    },
    getNextPageParam: (lastPage: PlaylistTrack) => {
      return lastPage.next ? (lastPage.offset || 0) + LIMIT : undefined;
    },
    initialPageParam: 0,
    enabled: !!id && !!access_token,
    retry: false,
  });
};

export default useGetPlaylistItems;
