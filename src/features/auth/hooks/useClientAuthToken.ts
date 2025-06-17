import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import getClientAuthToken from "@features/auth/api/getClientAuthToken";
import useClientAuthStore from "@features/auth/store/useClientAuthStore";

import { CLIENT_AUTH_TOKEN_ENDPOINT } from "@shared/configs/env";

const useGetClientAuthToken = (): string | null => {
  const { token, setToken } = useClientAuthStore();

  const { data, isSuccess } = useQuery({
    queryKey: ["client-credential-token"],
    queryFn: () => getClientAuthToken(CLIENT_AUTH_TOKEN_ENDPOINT),
    enabled: !token,
  });

  useEffect(() => {
    if (isSuccess && data?.access_token) {
      setToken(data.access_token);
    }
  }, [isSuccess, data?.access_token, setToken]);

  return token;
};

export default useGetClientAuthToken;
