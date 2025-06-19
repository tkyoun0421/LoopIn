import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import getCurrentUserProfile from "@features/user/api/getCurrentUserProfile";
import { CurrentUserProfileResponse } from "@features/user/model/user";

import { generateQueryKey } from "@shared/tanstack-query/libs/keyFactories";
import { queryKey } from "@shared/tanstack-query/queryKey";

const useGetCurrentUserProfile = (): UseQueryResult<
  CurrentUserProfileResponse | undefined
> => {
  const { access_token } = useTokenStore();

  return useQuery({
    queryKey: generateQueryKey(queryKey.currentUserProfile),
    queryFn: () => getCurrentUserProfile(),
    enabled: !!access_token,
  });
};

export default useGetCurrentUserProfile;
