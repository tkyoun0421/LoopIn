import axios from "axios";

import {
  GetSeveralBrowseCategoriesParams,
  GetSeveralBrowseCategoriesResponse,
} from "@features/categories/models/categories";

const getSeveralBrowseCategories = async (
  accessToken: string,
  params?: GetSeveralBrowseCategoriesParams,
): Promise<GetSeveralBrowseCategoriesResponse> => {
  const url = `https://api.spotify.com/v1/browse/categories`;

  try {
    const response = await axios.get<GetSeveralBrowseCategoriesResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching browse categories:", error);
    throw new Error("Failed to fetch several browse categories");
  }
};

export default getSeveralBrowseCategories;
