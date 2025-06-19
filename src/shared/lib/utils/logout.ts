import useClientAuthStore from "@features/auth/store/useClientAuthStore";
import { useTokenStore } from "@features/auth/store/useTokenStore";

export const handleLogout = () => {
  useTokenStore.getState().clearToken();
  useClientAuthStore.getState().clearClientAuthToken();

  window.location.href = "/";
};
