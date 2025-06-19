import { Playlist } from "@features/playlist/model/playlist";

import { APIBuilder } from "@shared/configs/api";
import { Track } from "@shared/model/sharedType";

export const addItemToPlaylist = async (
  playlistId: string,
  trackUris: Track["uri"][],
  position: number = 0,
): Promise<Playlist> => {
  try {
    const body: { uris: Track["uri"][]; position: number } = {
      uris: trackUris,
      position,
    };

    const response = await APIBuilder.post(
      `playlists/${playlistId}/tracks`,
      body,
    )
      .authType("user")
      .build()
      .call<Playlist>();

    return response.data;
  } catch (error) {
    console.error("플레이리스트 아이템 추가 실패: ", error);
    throw new Error("플레이리스트에 아이템을 추가하는 중 오류가 발생했습니다.");
  }
};
