import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import getClientAuthToken from "@features/auth/api/getClientAuthToken";
import { ClientAuthTokenResponse } from "@features/auth/model/auth";
import useClientAuthStore from "@features/auth/store/useClientAuthStore";

const useGetClientAuthToken = ():
  | ClientAuthTokenResponse["access_token"]
  | null => {
  const { clientAuthToken, setClientAuthToken } = useClientAuthStore();

  const { data, isSuccess } = useQuery({
    queryKey: ["client-credential-token"],
    queryFn: () => getClientAuthToken(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isSuccess && data?.access_token) {
      setClientAuthToken(data.access_token);
    }
  }, [isSuccess, data?.access_token, setClientAuthToken]);

  return clientAuthToken;
};

export default useGetClientAuthToken;
