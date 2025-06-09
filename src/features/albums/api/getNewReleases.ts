import axios from "axios";

import { GetNewReleasesResponse } from "@features/albums/model/albums";
import { NEW_RELEASES_ITEM_LIMIT } from "@features/albums/model/albumsConstant";
import { ClientAuthTokenResponse } from "@features/auth/model/auth";

export const getNewReleases = async (
  endpoint: string,
  clientAuthToken: ClientAuthTokenResponse["access_token"],
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await axios.get(
      `${endpoint}?limit=${NEW_RELEASES_ITEM_LIMIT}`,
      {
        headers: {
          Authorization: `Bearer ${clientAuthToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch new releases");
  }
};
