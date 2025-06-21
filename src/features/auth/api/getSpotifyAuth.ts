import { AuthUrlParams } from "@features/auth/model/auth";

import { CLIENT_ID } from "@shared/configs/clientConfig";
import { AUTH_ENDPOINT, REDIRECT_URI } from "@shared/configs/env";
import { SCOPES } from "@shared/configs/scope";
import {
  base64encode,
  generateRandomString,
  sha256,
} from "@shared/lib/utils/crypto";

const getSpotifyAuth = async (): Promise<void> => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const isAuthParamsValid = !!CLIENT_ID && !!REDIRECT_URI;
  const scope = SCOPES;
  const authUrl = new URL(AUTH_ENDPOINT);

  window.localStorage.setItem("code_verifier", codeVerifier);

  // 현재 경로를 저장
  const currentPath = window.location.pathname + window.location.search;
  window.localStorage.setItem("redirect_after_login", currentPath);

  if (isAuthParamsValid) {
    const params: AuthUrlParams = {
      response_type: "code",
      client_id: CLIENT_ID,
      scope: scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: REDIRECT_URI,
    };

    authUrl.search = new URLSearchParams(Object.entries(params)).toString();
    window.location.href = authUrl.toString();
  }
};

export default getSpotifyAuth;
