import { create } from "zustand";

const useClientAuthStore = create<ClientAuthState>(set => ({
  clientAuthToken: null,

  setClientAuthToken: (token: string) => {
    set({ clientAuthToken: token });
  },

  clearClientAuthToken: () => {
    set({ clientAuthToken: null });
  },
}));

export default useClientAuthStore;

type ClientAuthState = {
  clientAuthToken: string | null;
  setClientAuthToken: (token: string) => void;
  clearClientAuthToken: () => void;
};
