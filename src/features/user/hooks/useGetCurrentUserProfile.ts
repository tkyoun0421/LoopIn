import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import getCurrentUserProfile from "@features/user/api/getCurrentUserProfile";
import { CurrentUserProfileResponse } from "@features/user/model/user";

const useGetCurrentUserProfile = (): UseQueryResult<
  CurrentUserProfileResponse | undefined
> => {
  const { accessToken } = useTokenStore();

  return useQuery({
    queryKey: ["current-user-profile", accessToken],
    queryFn: () => {
      if (!accessToken) throw new Error("No access token");
      return getCurrentUserProfile(accessToken);
    },
    enabled: !!accessToken,
  });
};

export default useGetCurrentUserProfile;
