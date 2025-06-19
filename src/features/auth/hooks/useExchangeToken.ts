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
      navigate("/");
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
