import { Playlist } from "@features/playlist/model/playlist";

import { apiInstance } from "@shared/configs/api";

const getPlaylist = async (id: string): Promise<Playlist> => {
  try {
    const response = await apiInstance.get(
      `https://api.spotify.com/v1/playlists/${id}`,
    );

    console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch playlist");
  }
};
export default getPlaylist;
