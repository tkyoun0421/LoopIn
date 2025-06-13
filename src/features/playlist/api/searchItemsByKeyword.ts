import axios from "axios";

import {
  SearchRequestParams,
  SearchResponse,
} from "@features/playlist/model/search";

export const searchItemsByKeyword = async (
  token: string,
  params: SearchRequestParams,
): Promise<SearchResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("q", params.q);
    searchParams.append("type", params.type.join(","));

    if (params.market) searchParams.append("market", params.market);
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.offset) searchParams.append("offset", params.offset.toString());
    if (params.include_external)
      searchParams.append("include_external", params.include_external);

    const response = await axios.get(
      `https://api.spotify.com/v1/search?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error("fail to search by keyword");
  }
};
