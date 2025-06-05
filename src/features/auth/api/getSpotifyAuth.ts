import { AuthUrlParams } from "@features/auth/model/auth";

import { CLIENT_ID } from "@shared/configs/clientConfig";
import { REDIRECT_URI } from "@shared/configs/env";
import {
  base64encode,
  generateRandomString,
  sha256,
} from "@shared/lib/utils/crypto";

const getSpotifyAuth = async (): Promise<void> => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const redirectUri = REDIRECT_URI;
  const clientId = CLIENT_ID;
  const scope = "user-read-private user-read-email";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  window.localStorage.setItem("code_verifier", codeVerifier);

  if (clientId && redirectUri) {
    const params: AuthUrlParams = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(Object.entries(params)).toString();
    console.log("a", redirectUri);
    // window.location.href = authUrl.toString();
  }
  console.log("b", redirectUri);
};

export default getSpotifyAuth;
