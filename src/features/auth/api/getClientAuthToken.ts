import { ClientAuthTokenResponse } from "@features/auth/model/auth";

import { APIBuilder } from "@shared/configs/api";
import { CLIENT_ID, CLIENT_SECRET_KEY } from "@shared/configs/clientConfig";

const encodeBasicAuthHeader = (clientId: string, secretKey: string): string => {
  return `Basic ${btoa(`${clientId}:${secretKey}`)}`;
};

const getClientAuthToken = async (): Promise<ClientAuthTokenResponse> => {
  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
    });

    const response = await APIBuilder.post("/api/token", body)
      .baseURL("https://accounts.spotify.com")
      .headers({
        Authorization: encodeBasicAuthHeader(CLIENT_ID, CLIENT_SECRET_KEY),
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .build()
      .call<ClientAuthTokenResponse>();

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch client credential token");
  }
};

export default getClientAuthToken;
