import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { createPlaylist } from "@features/playlist/api/createPlaylist";
import { Playlist, PlaylistFormData } from "@features/playlist/model/playlist";
import useGetCurrentUserProfile from "@features/user/hooks/useGetCurrentUserProfile";

import { queryClient } from "@shared/lib/react-query/queryClient";

const useCreatePlaylist = (): UseMutationResult<
  Playlist,
  Error,
  PlaylistFormData
> => {
  const { data: user } = useGetCurrentUserProfile();

  return useMutation({
    mutationKey: ["createPlaylist"],
    mutationFn: (data: PlaylistFormData) => {
      if (!user) {
        throw new Error("사용자 정보를 불러오는데 실패했습니다");
      }
      return createPlaylist(data, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserPlaylists"] });
    },
  });
};

export default useCreatePlaylist;
