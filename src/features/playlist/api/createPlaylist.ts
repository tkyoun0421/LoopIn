import { PlaylistFormData } from "@features/playlist/hooks/useCreatePlaylistModal";
import { Playlist } from "@features/playlist/model/playlist";

import { apiInstance } from "@shared/configs/api";

export const createPlaylist = async (
  data: PlaylistFormData,
  userId: string,
): Promise<Playlist> => {
  try {
    const response = await apiInstance.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: data.name,
        description: data.description,
        public: data.public,
        collaborative: data.collaborative,
      },
    );

    return response.data;
  } catch (error) {
    console.error("플레이리스트 생성 실패: ", error);
    throw new Error(error as string);
  }
};
