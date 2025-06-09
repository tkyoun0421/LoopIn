import {
  GetCurrentUserPlaylistsRequest,
  GetCurrentUserPlaylistsResponse,
} from "@features/playlist/model/playlist";

import { apiInstance } from "@shared/configs/api";
import { CURRENT_USER_PLAYLISTS_ENDPOINT } from "@shared/configs/env";

const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistsRequest): Promise<GetCurrentUserPlaylistsResponse> => {
  try {
    const response = await apiInstance.get(CURRENT_USER_PLAYLISTS_ENDPOINT, {
      params: { limit, offset },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch current user playlists");
  }
};

export default getCurrentUserPlaylists;
