import { PlaylistTrack } from "@features/playlist/model/playlist";

import { apiInstance } from "@shared/configs/api";

interface GetPlaylistItemsParams {
  playlistId: string;
  limit?: number;
  offset?: number;
}

const getPlaylistItems = async ({
  playlistId,
  limit = 20,
  offset = 0,
}: GetPlaylistItemsParams): Promise<PlaylistTrack> => {
  try {
    const response = await apiInstance.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch playlist items");
  }
};

export default getPlaylistItems;
