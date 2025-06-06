import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ExchangeTokenResponse } from "@features/auth/model/auth";
import { PersistedTokenState, TokenState } from "@features/auth/model/storage";

import { getStorageWrapper } from "@shared/lib/utils/storage";

export const useTokenStore = create<TokenState>()(
  persist(
    set => ({
      access_token: null,
      refresh_token: null,
      token: null,

      setToken: (token: ExchangeTokenResponse) =>
        set({
          token,
          access_token: token.access_token,
          refresh_token: token.refresh_token,
        }),

      clearToken: () =>
        set({
          token: null,
          access_token: null,
          refresh_token: null,
        }),
    }),
    {
      name: "token-storage",
      storage: getStorageWrapper<PersistedTokenState>("localStorage"),
      partialize: (state): PersistedTokenState => ({
        access_token: state.access_token ?? "",
        refresh_token: state.refresh_token ?? "",
      }),
    },
  ),
);
