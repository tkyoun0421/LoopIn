import axios from "axios";

import { CurrentUserProfileResponse } from "@features/user/model/user";

import { CURRENT_USER_ENDPOINT } from "@shared/configs/env";

const getCurrentUserProfile = async (
  accessToken: string,
): Promise<CurrentUserProfileResponse | undefined> => {
  try {
    const response = await axios.get(CURRENT_USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fetch current user profile.");
  }
};

export default getCurrentUserProfile;
