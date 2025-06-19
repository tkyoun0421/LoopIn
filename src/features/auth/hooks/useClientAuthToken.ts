import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import getClientAuthToken from "@features/auth/api/getClientAuthToken";
import { ClientAuthTokenResponse } from "@features/auth/model/auth";
import useClientAuthStore from "@features/auth/store/useClientAuthStore";

import { generateQueryKey } from "@shared/tanstack-query/libs/keyFactories";
import { queryKey } from "@shared/tanstack-query/queryKey";

const useGetClientAuthToken = ():
  | ClientAuthTokenResponse["access_token"]
  | null => {
  const { clientAuthToken, setClientAuthToken } = useClientAuthStore();

  const { data, isSuccess } = useQuery({
    queryKey: generateQueryKey(queryKey.clientAuthToken),
    queryFn: getClientAuthToken,
    enabled: !clientAuthToken,
  });

  useEffect(() => {
    if (isSuccess && data?.access_token) {
      setClientAuthToken(data.access_token);
    }
  }, [isSuccess, data?.access_token, setClientAuthToken]);

  return clientAuthToken;
};

export default useGetClientAuthToken;
