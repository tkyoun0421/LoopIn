import {
  GetSeveralBrowseCategoriesParams,
  GetSeveralBrowseCategoriesResponse,
} from "@features/categories/models/categories";

import { APIBuilder } from "@shared/configs/api";

const getSeveralBrowseCategories = async (
  params: GetSeveralBrowseCategoriesParams = {
    locale: "ko",
    limit: 30,
    offset: 0,
  },
): Promise<GetSeveralBrowseCategoriesResponse> => {
  try {
    const response = await APIBuilder.get("browse/categories")
      .authType("client")
      .params(params)
      .build()
      .call<GetSeveralBrowseCategoriesResponse>();

    return response.data;
  } catch (error) {
    console.error("Error fetching browse categories:", error);
    throw new Error("Failed to fetch several browse categories");
  }
};

export default getSeveralBrowseCategories;
