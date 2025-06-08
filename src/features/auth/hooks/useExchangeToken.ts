// hooks/useExchangeToken.ts
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { getToken } from "@features/auth/api/getToken";
import { ExchangeTokenResponse } from "@features/auth/model/auth";

interface UseExchangeTokenOptions {
  onSuccess?: (data: ExchangeTokenResponse) => void;
  onError?: (error: unknown) => void;
}

const useExchangeToken = (
  options?: UseExchangeTokenOptions,
): UseMutationResult<ExchangeTokenResponse, unknown, string> => {
  return useMutation<ExchangeTokenResponse, unknown, string>({
    mutationFn: async (code: string) => {
      return await getToken(code);
    },
    ...options,
  });
};

export default useExchangeToken;
