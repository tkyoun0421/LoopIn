import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useTokenStore } from "@features/auth/store/useTokenStore";

import { queryClient } from "@shared/lib/react-query/queryClient";

const useLogout = (): { logout: () => void } => {
  const { clearToken } = useTokenStore();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    try {
      clearToken();

      queryClient.clear();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("로그아웃 중 오류:", error);
      navigate("/error", { replace: true });
    }
  }, [clearToken, navigate]);

  return { logout };
};

export default useLogout;
