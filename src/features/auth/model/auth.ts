export interface ClientAuthTokenResponse {
  access_token: string;
  token_type: "Bearer";
  express_in: number;
}

export interface AuthUrlParams {
  response_type: "code";
  client_id: string;
  scope: string;
  code_challenge_method: "S256";
  code_challenge: string;
  redirect_uri: string;
}
