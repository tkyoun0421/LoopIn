import { create } from "zustand";
import { persist } from "zustand/middleware";

const useClientAuthStore = create<ClientAuthState>()(
  persist(
    set => ({
      clientAuthToken: null,

      setClientAuthToken: (token: string) => {
        set({ clientAuthToken: token });
      },

      clearClientAuthToken: () => {
        set({ clientAuthToken: null });
      },
    }),
    {
      name: "client-auth-storage",
      partialize: state => ({ clientAuthToken: state.clientAuthToken }),
    },
  ),
);

export default useClientAuthStore;

type ClientAuthState = {
  clientAuthToken: string | null;
  setClientAuthToken: (token: string) => void;
  clearClientAuthToken: () => void;
};
