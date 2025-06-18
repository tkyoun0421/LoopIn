import {
  GetSeveralBrowseCategoriesParams,
  GetSeveralBrowseCategoriesResponse,
} from "@features/categories/models/categories";

import { APIBuilder } from "@shared/configs/api";

const getSeveralBrowseCategories = async (
  params?: GetSeveralBrowseCategoriesParams,
): Promise<GetSeveralBrowseCategoriesResponse> => {
  try {
    const queryParams: Record<string, string> = {};

    if (params?.locale) queryParams.locale = params.locale;
    if (params?.limit) queryParams.limit = params.limit.toString();
    if (params?.offset) queryParams.offset = params.offset.toString();

    const response = await APIBuilder.get(
      "https://api.spotify.com/v1/browse/categories",
    )
      .authType("client")
      .params(queryParams)
      .build()
      .call<GetSeveralBrowseCategoriesResponse>();

    return response.data;
  } catch (error) {
    console.error("Error fetching browse categories:", error);
    throw new Error("Failed to fetch several browse categories");
  }
};

export default getSeveralBrowseCategories;
