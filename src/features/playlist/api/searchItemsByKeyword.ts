import {
  SearchRequestParams,
  SearchResponse,
} from "@features/playlist/model/search";

import { APIBuilder } from "@shared/configs/api";

export const searchItemsByKeyword = async (
  params: SearchRequestParams,
): Promise<SearchResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("q", params.q);
    searchParams.append("type", params.type.join(","));

    const response = await APIBuilder.get(`search?${searchParams.toString()}`)
      .authType("user")
      .params(params)
      .build()
      .call<SearchResponse>();

    return response.data;
  } catch (error) {
    throw new Error("fail to search by keyword");
  }
};
