import { Playlist, PlaylistFormData } from "@features/playlist/model/playlist";

import { APIBuilder } from "@shared/configs/api";

export const createPlaylist = async (
  data: PlaylistFormData,
  userId: string,
): Promise<Playlist> => {
  try {
    const response = await APIBuilder.post(`users/${userId}/playlists`, {
      name: data.name,
      description: data.description,
      public: data.public,
      collaborative: data.collaborative,
    })
      .authType("user")
      .build()
      .call<Playlist>();

    return response.data;
  } catch (error) {
    console.error("플레이리스트 생성 실패: ", error);
    throw new Error(error as string);
  }
};
