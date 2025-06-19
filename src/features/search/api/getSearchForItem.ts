import { AxiosError } from "axios";

import {
  GetSearchForItemParams,
  SearchForItemResponse,
} from "@features/search/models/search";

import { APIBuilder } from "@shared/configs/api";

const getSearchForItem = async (
  params: GetSearchForItemParams,
): Promise<SearchForItemResponse> => {
  try {
    const response = await APIBuilder.get("search")
      .authType("client")
      .params(params)
      .build()
      .call<SearchForItemResponse>();

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      throw new Error(error.response?.data.error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export default getSearchForItem;
