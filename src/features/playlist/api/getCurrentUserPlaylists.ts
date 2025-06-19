import {
  GetCurrentUserPlaylistsRequest,
  GetCurrentUserPlaylistsResponse,
} from "@features/playlist/model/playlist";

import { APIBuilder } from "@shared/configs/api";

const getCurrentUserPlaylists = async ({
  limit = 20,
  offset = 0,
}: GetCurrentUserPlaylistsRequest): Promise<GetCurrentUserPlaylistsResponse> => {
  try {
    const response = await APIBuilder.get("me/playlists")
      .authType("user")
      .params({ limit, offset })
      .build()
      .call<GetCurrentUserPlaylistsResponse>();

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch current user playlists");
  }
};

export default getCurrentUserPlaylists;
