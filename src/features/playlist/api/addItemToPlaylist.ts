import { Playlist } from "@features/playlist/model/playlist";

import { apiInstance } from "@shared/configs/api";
import { Track } from "@shared/model/sharedType";

export const addItemToPlaylist = async (
  playlistId: string,
  trackUris: Track["uri"][],
  position?: number,
): Promise<Playlist> => {
  try {
    const requestBody: { uris: Track["uri"][]; position?: number } = {
      uris: trackUris,
    };

    if (position) {
      requestBody.position = position;
    }

    const response = await apiInstance.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      requestBody,
    );

    return response.data;
  } catch (error) {
    console.error("플레이리스트 아이템 추가 실패: ", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("플레이리스트에 아이템을 추가하는 중 오류가 발생했습니다.");
  }
};
