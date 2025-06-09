import { useCallback } from "react";

import { useTokenStore } from "@features/auth/store/useTokenStore";

import { queryClient } from "@shared/lib/react-query/queryClient";

const useLogout = (): { logout: () => void } => {
  const { clearToken } = useTokenStore();

  const logout = useCallback(() => {
    clearToken();
    queryClient.clear();
  }, [clearToken]);

  return { logout };
};

export default useLogout;
