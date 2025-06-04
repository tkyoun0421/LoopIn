import axios from "axios";

import { ClientAuthTokenResponse } from "@features/auth/model/auth";

import { CLIENT_ID, CLIENT_SECRET_KEY } from "@shared/configs/clientConfig";

const encodeBasicAuthHeader = (clientId: string, secretKey: string): string => {
  return `Basic ${btoa(`${clientId}:${secretKey}`)}`;
};

export const getClientAuthToken = async (
  endpoint: string,
): Promise<ClientAuthTokenResponse> => {
  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
    });

    const response = await axios.post(endpoint, body, {
      headers: {
        Authorization: encodeBasicAuthHeader(CLIENT_ID, CLIENT_SECRET_KEY),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch client credential token");
  }
};
