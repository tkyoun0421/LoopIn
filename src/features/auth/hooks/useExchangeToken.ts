import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { getToken } from "@features/auth/api/getToken";
import useLogout from "@features/auth/hooks/useLogout";
import { ExchangeTokenResponse } from "@features/auth/model/auth";
import { useTokenStore } from "@features/auth/store/useTokenStore";

const useExchangeToken = (
  options?: UseExchangeTokenOptions,
): UseMutationResult<ExchangeTokenResponse, unknown, string> => {
  const { setToken } = useTokenStore();
  const navigate = useNavigate();
  const { logout } = useLogout();

  return useMutation<ExchangeTokenResponse, unknown, string>({
    mutationFn: async (code: string) => {
      return await getToken(code);
    },

    onSuccess: data => {
      setToken(data);

      // localStorage에서 경로를 가져오면서 동시에 삭제
      const redirectPath = window.localStorage.getItem("redirect_after_login");
      if (redirectPath) {
        window.localStorage.removeItem("redirect_after_login");
      }

      navigate(redirectPath || "/");
    },
    onError: () => {
      logout();
      navigate("/");
    },
    ...options,
  });
};

export default useExchangeToken;

type UseExchangeTokenOptions = {
  onSuccess?: (data: ExchangeTokenResponse) => void;
  onError?: (error: unknown) => void;
};
