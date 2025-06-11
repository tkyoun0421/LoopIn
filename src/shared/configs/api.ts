import axios from "axios";

import { getRefreshToken } from "@features/auth/api/getRefreshToken";
import { useTokenStore } from "@features/auth/store/useTokenStore";

export const apiInstance = axios.create();

// 로그아웃 처리 함수 (Router 외부에서 사용 가능)
const handleLogout = () => {
  console.log("인증 실패로 인한 로그아웃 처리");
  useTokenStore.getState().clearToken();

  // Router 컨텍스트 외부이므로 window.location 사용
  window.location.href = "/";
};

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
        console.log("refresh_token이 없어 로그아웃 처리");
        handleLogout();
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
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
