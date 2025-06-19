import { PlaylistTrack } from "@features/playlist/model/playlist";

import { APIBuilder } from "@shared/configs/api";

const getPlaylistItems = async ({
  playlistId,
  limit = 10,
  offset = 0,
}: GetPlaylistItemsParams): Promise<PlaylistTrack> => {
  try {
    const response = await APIBuilder.get(`playlists/${playlistId}/tracks`)
      .authType("user")
      .params({ limit, offset })
      .build()
      .call<PlaylistTrack>();

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch playlist items");
  }
};

export default getPlaylistItems;

type GetPlaylistItemsParams = {
  playlistId: string;
  limit?: number;
  offset?: number;
};
