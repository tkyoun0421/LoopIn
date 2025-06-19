import { Playlist } from "@features/playlist/model/playlist";

import { APIBuilder } from "@shared/configs/api";

const getPlaylist = async (id: string): Promise<Playlist> => {
  try {
    const response = await APIBuilder.get(`playlists/${id}`)
      .authType("user")
      .build()
      .call<Playlist>();

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch playlist");
  }
};
export default getPlaylist;
