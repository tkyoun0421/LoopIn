import axios, { AxiosError } from "axios";

import { ClientAuthTokenResponse } from "@features/auth/model/auth";
import {
  GetSearchForItemParams,
  SearchForItemResponse,
} from "@features/search/models/search";

const getSearchForItem = async (
  clientAuthToken: ClientAuthTokenResponse["access_token"],
  params?: GetSearchForItemParams,
): Promise<SearchForItemResponse> => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${clientAuthToken}`,
      },
      params,
    });

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
