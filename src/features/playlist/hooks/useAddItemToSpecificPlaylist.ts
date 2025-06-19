import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { addItemToPlaylist } from "@features/playlist/api/addItemToPlaylist";
import { Playlist } from "@features/playlist/model/playlist";

import { Track } from "@shared/model/sharedType";
import { generateQueryKey } from "@shared/tanstack-query/libs/keyFactories";
import { queryClient } from "@shared/tanstack-query/queryClient";
import { queryKey } from "@shared/tanstack-query/queryKey";

const useAddItemToSpecificPlaylist = (): UseMutationResult<
  Playlist,
  Error,
  AddItemToSpecificPlaylistParams
> => {
  return useMutation({
    mutationFn: ({ playlistId, trackUris }: AddItemToSpecificPlaylistParams) =>
      addItemToPlaylist(playlistId, trackUris),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: generateQueryKey(queryKey.currentUserPlaylists),
      });
      queryClient.invalidateQueries({
        queryKey: generateQueryKey(queryKey.playlist),
      });
      queryClient.invalidateQueries({
        queryKey: generateQueryKey(queryKey.playlistItems),
      });
    },
  });
};

export default useAddItemToSpecificPlaylist;

type AddItemToSpecificPlaylistParams = {
  playlistId: string;
  trackUris: Track["uri"][];
};
