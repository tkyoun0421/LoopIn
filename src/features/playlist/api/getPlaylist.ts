import { Playlist } from "@features/playlist/model/playlist";

import { apiInstance } from "@shared/configs/api";
import { GET_PLAYLIST_ENDPOINT } from "@shared/configs/env";

const getPlaylist = async (id: string): Promise<Playlist> => {
  try {
    const response = await apiInstance.get(`${GET_PLAYLIST_ENDPOINT}/${id}`);

    console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch playlist");
  }
};
export default getPlaylist;
