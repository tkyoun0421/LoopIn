import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useParams } from "react-router";

import { addItemToPlaylist } from "@features/playlist/api/addItemToPlaylist";
import { Playlist } from "@features/playlist/model/playlist";

import { Track } from "@shared/model/sharedType";
import { generateQueryKey } from "@shared/tanstack-query/libs/keyFactories";
import { queryClient } from "@shared/tanstack-query/queryClient";
import { queryKey } from "@shared/tanstack-query/queryKey";

const useAddItemToPlaylist = (): UseMutationResult<
  Playlist,
  Error,
  Track["uri"][]
> => {
  const { id: playlistId } = useParams();

  return useMutation({
    mutationFn: (trackUris: Track["uri"][]) => {
      if (!playlistId) {
        throw new Error("플레이리스트 ID가 없습니다");
      }
      return addItemToPlaylist(playlistId, trackUris);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: generateQueryKey(queryKey.currentUserPlaylists),
      });
      queryClient.invalidateQueries({
        queryKey: generateQueryKey(queryKey.playlist, playlistId),
      });
      queryClient.invalidateQueries({
        queryKey: generateQueryKey(queryKey.playlistItems, playlistId),
      });
    },
  });
};

export default useAddItemToPlaylist;
