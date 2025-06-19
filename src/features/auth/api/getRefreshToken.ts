import { ExchangeTokenResponse } from "@features/auth/model/auth";
import { useTokenStore } from "@features/auth/store/useTokenStore";

import { APIBuilder } from "@shared/configs/api";
import { CLIENT_ID } from "@shared/configs/clientConfig";

export const getRefreshToken = async (): Promise<ExchangeTokenResponse> => {
  const { refresh_token } = useTokenStore.getState();

  if (!refresh_token) {
    console.error("Refresh token이 없습니다.");
    throw new Error("No refresh token available");
  }

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refresh_token,
    client_id: CLIENT_ID,
  });

  try {
    const response = await APIBuilder.post("/api/token", params)
      .baseURL("https://accounts.spotify.com")
      .headers({
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .build()
      .call<ExchangeTokenResponse>();

    return response.data;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    throw new Error("토큰 갱신 실패");
  }
};
