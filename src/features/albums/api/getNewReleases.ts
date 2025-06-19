import { GetNewReleasesResponse } from "@features/albums/model/albums";
import { NEW_RELEASES_ITEM_LIMIT } from "@features/albums/model/albumsConstant";

import { APIBuilder } from "@shared/configs/api";

export const getNewReleases = async (
  endpoint: string,
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await APIBuilder.get(endpoint)
      .params({ limit: NEW_RELEASES_ITEM_LIMIT.toString() })
      .authType("client")
      .build()
      .call<GetNewReleasesResponse>();

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch new releases");
  }
};
