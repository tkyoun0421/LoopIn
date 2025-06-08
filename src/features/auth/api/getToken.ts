import { ExchangeTokenResponse } from "@features/auth/model/auth";

import { CLIENT_ID } from "@shared/configs/clientConfig";
import { GET_TOKEN_ENDPOINT, REDIRECT_URI } from "@shared/configs/env";
import { memoizedPostRequest } from "@shared/lib/utils/tokenRequestCache";

export const getToken = async (
  code: string,
): Promise<ExchangeTokenResponse> => {
  const codeVerifier = localStorage.getItem("code_verifier");

  if (!codeVerifier) {
    throw new Error("fail to fetch code verifier.");
  }

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: codeVerifier,
  });

  return memoizedPostRequest(GET_TOKEN_ENDPOINT, body, {
    "Content-Type": "application/x-www-form-urlencoded",
  });
};
