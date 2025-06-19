import { CurrentUserProfileResponse } from "@features/user/model/user";

import { APIBuilder } from "@shared/configs/api";

const getCurrentUserProfile = async (): Promise<
  CurrentUserProfileResponse | undefined
> => {
  try {
    const response = await APIBuilder.get("me")
      .authType("user")
      .build()
      .call<CurrentUserProfileResponse>();

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch current user profile.");
  }
};

export default getCurrentUserProfile;
