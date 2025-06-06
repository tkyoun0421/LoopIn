import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useRef } from "react";

import { getToken } from "@features/auth/api/getToken";
import { ExchangeTokenResponse } from "@features/auth/model/auth";

interface UseExchangeTokenOptions {
  onSuccess?: (data: ExchangeTokenResponse) => void;
  onError?: (error: unknown) => void;
}

const useExchangeToken = (
  options?: UseExchangeTokenOptions,
): UseMutationResult<ExchangeTokenResponse, unknown, string> => {
  const controllerRef = useRef<AbortController | null>(null);

  return useMutation<ExchangeTokenResponse, unknown, string>({
    mutationFn: (code: string) => {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      return getToken(code, { signal: controllerRef.current.signal });
    },
    ...options,
  });
};

export default useExchangeToken;
