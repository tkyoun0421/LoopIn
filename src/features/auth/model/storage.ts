import { ExchangeTokenResponse } from "@features/auth/model/auth";

import { Nullable } from "@shared/model/utilityType";

export interface TokenState extends Nullable<PersistedTokenState> {
  token: ExchangeTokenResponse | null;
  setToken: (token: ExchangeTokenResponse) => void;
  clearToken: () => void;
}

export type PersistedTokenState = Pick<
  ExchangeTokenResponse,
  "access_token" | "refresh_token"
>;
