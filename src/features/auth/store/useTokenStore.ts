import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  clearAccessToken: () => void;
  clearRefreshToken: () => void;
  clearToken: () => void;
}

export const useTokenStore = create<TokenState>()(
  persist(
    set => ({
      accessToken: null,
      refreshToken: null,
      setAccessToken: token => set({ accessToken: token }),
      setRefreshToken: token => set({ refreshToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
      clearRefreshToken: () => set({ refreshToken: null }),
      clearToken: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: "token-storage",
      partialize: (state: TokenState) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
