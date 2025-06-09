import axios from "axios";

import { getRefreshToken } from "@features/auth/api/getRefreshToken";
import { useTokenStore } from "@features/auth/store/useTokenStore";

export const apiInstance = axios.create();

apiInstance.interceptors.request.use(
  config => {
    const { access_token } = useTokenStore.getState();

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refresh_token } = useTokenStore.getState();

      if (!refresh_token) {
        return Promise.reject(error);
      }

      try {
        console.log("토큰 갱신 시도...");
        await getRefreshToken();

        const { access_token } = useTokenStore.getState();
        if (access_token) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          console.log("토큰 갱신 후 요청 재시도");
          return apiInstance(originalRequest);
        } else {
          throw new Error("토큰 갱신 후에도 access_token이 없습니다.");
        }
      } catch (refreshError) {
        console.error("토큰 갱신 실패, 로그아웃 처리:", refreshError);
        useTokenStore.getState().clearToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
