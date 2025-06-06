import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import getCurrentUserProfile from "@features/user/api/getCurrentUserProfile";
import { CurrentUserProfileResponse } from "@features/user/model/user";

const useGetCurrentUserProfile = (): UseQueryResult<
  CurrentUserProfileResponse | undefined
> => {
  const { access_token } = useTokenStore();

  return useQuery({
    queryKey: ["current-user-profile", access_token],
    queryFn: () => {
      if (!access_token) throw new Error("No access token");
      return getCurrentUserProfile(access_token);
    },
    enabled: !!access_token,
  });
};

export default useGetCurrentUserProfile;
