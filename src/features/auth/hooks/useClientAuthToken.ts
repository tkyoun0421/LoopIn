import { useQuery } from "@tanstack/react-query";

import { getClientAuthToken } from "@features/auth/api/getClientAuthToken";
import { ClientAuthTokenResponse } from "@features/auth/model/auth";

import { clientAuthTokenEndpoint } from "@shared/configs/env";

const useGetClientAuthToken = ():
  | ClientAuthTokenResponse["access_token"]
  | undefined => {
  const { data } = useQuery({
    queryKey: ["client-credential=token"],
    queryFn: () => getClientAuthToken(clientAuthTokenEndpoint),
  });

  const clientAuthToke = data?.access_token;

  return clientAuthToke;
};

export default useGetClientAuthToken;
