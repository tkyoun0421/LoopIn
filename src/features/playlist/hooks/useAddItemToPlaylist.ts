import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useParams } from "react-router";

import { addItemToPlaylist } from "@features/playlist/api/addItemToPlaylist";
import { Playlist } from "@features/playlist/model/playlist";

import { queryClient } from "@shared/lib/react-query/queryClient";
import { Track } from "@shared/model/sharedType";

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
      queryClient.invalidateQueries({ queryKey: ["currentUserPlaylists"] });

      if (playlistId) {
        queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
        queryClient.invalidateQueries({
          queryKey: ["playlist-items", playlistId],
        });
      }
    },
    onError: error => {
      console.error("트랙 추가 실패:", error);
    },
  });
};

export default useAddItemToPlaylist;
