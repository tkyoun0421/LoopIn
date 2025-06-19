import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { createPlaylist } from "@features/playlist/api/createPlaylist";
import { Playlist, PlaylistFormData } from "@features/playlist/model/playlist";
import useGetCurrentUserProfile from "@features/user/hooks/useGetCurrentUserProfile";

import { generateQueryKey } from "@shared/tanstack-query/libs/keyFactories";
import { queryClient } from "@shared/tanstack-query/queryClient";
import { queryKey } from "@shared/tanstack-query/queryKey";

const useCreatePlaylist = (): UseMutationResult<
  Playlist,
  Error,
  PlaylistFormData
> => {
  const { data: user } = useGetCurrentUserProfile();

  return useMutation({
    mutationKey: generateQueryKey(queryKey.createPlaylist),
    mutationFn: (data: PlaylistFormData) => {
      if (!user) {
        throw new Error("사용자 정보를 불러오는데 실패했습니다");
      }
      return createPlaylist(data, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: generateQueryKey(queryKey.currentUserPlaylists),
      });
    },
  });
};

export default useCreatePlaylist;
