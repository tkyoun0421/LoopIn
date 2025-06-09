import axios from "axios";

import { useTokenStore } from "@features/auth/store/useTokenStore";

import { CLIENT_ID } from "@shared/configs/clientConfig";
import { GET_TOKEN_ENDPOINT } from "@shared/configs/env";

export const getRefreshToken = async (): Promise<void> => {
  const { refresh_token } = useTokenStore.getState();

  if (!refresh_token) {
    console.error("Refresh token이 없습니다.");
    throw new Error("No refresh token available");
  }

  const url = GET_TOKEN_ENDPOINT;

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refresh_token,
    client_id: CLIENT_ID,
  });

  try {
    console.log("리프레쉬 토큰 실행", refresh_token);

    const response = await axios.post(url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const {
      access_token,
      refresh_token: newRefreshToken,
      scope,
      token_type,
      express_in,
    } = response.data;

    useTokenStore.getState().setToken({
      access_token: access_token,
      refresh_token: newRefreshToken || refresh_token,
      scope: scope || "",
      token_type: token_type || "Bearer",
      express_in: express_in || 3600,
    });

    console.log("토큰 갱신 성공");
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    throw error;
  }
};
