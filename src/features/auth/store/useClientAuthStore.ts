import { create } from "zustand";

interface ClientAuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useClientAuthStore = create<ClientAuthState>(set => ({
  token: null,

  setToken: (token: string) => {
    set({ token });
  },

  clearToken: () => {
    set({ token: null });
  },
}));

export default useClientAuthStore;
