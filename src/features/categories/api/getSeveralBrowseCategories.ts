import axios from "axios";

import { ClientAuthTokenResponse } from "@features/auth/model/auth";
import {
  GetSeveralBrowseCategoriesParams,
  GetSeveralBrowseCategoriesResponse,
} from "@features/categories/models/categories";

const getSeveralBrowseCategories = async (
  clientAuthToken: ClientAuthTokenResponse["access_token"],
  params?: GetSeveralBrowseCategoriesParams,
): Promise<GetSeveralBrowseCategoriesResponse> => {
  const url = `https://api.spotify.com/v1/browse/categories`;

  try {
    const response = await axios.get<GetSeveralBrowseCategoriesResponse>(url, {
      headers: {
        Authorization: `Bearer ${clientAuthToken}`,
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
