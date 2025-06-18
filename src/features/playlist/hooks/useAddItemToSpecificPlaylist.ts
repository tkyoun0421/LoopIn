import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { addItemToPlaylist } from "@features/playlist/api/addItemToPlaylist";
import { Playlist } from "@features/playlist/model/playlist";

import { queryClient } from "@shared/lib/react-query/queryClient";
import { Track } from "@shared/model/sharedType";

interface AddItemToSpecificPlaylistParams {
  playlistId: string;
  trackUris: Track["uri"][];
}

const useAddItemToSpecificPlaylist = (): UseMutationResult<
  Playlist,
  Error,
  AddItemToSpecificPlaylistParams
> => {
  return useMutation({
    mutationFn: ({
      playlistId,
      trackUris,
    }: AddItemToSpecificPlaylistParams) => {
      return addItemToPlaylist(playlistId, trackUris);
    },
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ["currentUserPlaylists"] });
      queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
      queryClient.invalidateQueries({
        queryKey: ["playlist-items", playlistId],
      });
    },
    onError: error => {
      console.error("트랙 추가 실패:", error);
    },
  });
};

export default useAddItemToSpecificPlaylist;
