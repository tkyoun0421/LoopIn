import axios, { AxiosPromise, AxiosInstance } from "axios";

import { getRefreshToken } from "@features/auth/api/getRefreshToken";
import useClientAuthStore from "@features/auth/store/useClientAuthStore";
import { useTokenStore } from "@features/auth/store/useTokenStore";

import { handleLogout } from "@shared/lib/utils/logout";
import {
  AuthStrategy,
  AuthType,
  HTTPHeaders,
  HTTPMethod,
  HTTPParams,
} from "@shared/model/api";

class ClientAuthStrategy implements AuthStrategy {
  setupRequestInterceptor(http: AxiosInstance): void {
    http.interceptors.request.use(
      config => {
        const { clientAuthToken } = useClientAuthStore.getState();
        if (clientAuthToken) {
          config.headers.Authorization = `Bearer ${clientAuthToken}`;
        } else {
          console.warn(
            "⚠️ [ClientAuthStrategy] clientAuthToken이 없어서 헤더 설정 안됨",
          );
        }
        return config;
      },
      error => Promise.reject(error),
    );
  }

  setupResponseInterceptor(http: AxiosInstance): void {
    http.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          console.warn(
            "⚠️ [ClientAuthStrategy] Client token 만료 - 토큰 재발급 필요",
          );

          useClientAuthStore.getState().clearClientAuthToken();
        }
        return Promise.reject(error);
      },
    );
  }
}

class UserAuthStrategy implements AuthStrategy {
  setupRequestInterceptor(http: AxiosInstance): void {
    http.interceptors.request.use(
      config => {
        const { access_token } = useTokenStore.getState();
        if (access_token) {
          config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );
  }

  setupResponseInterceptor(http: AxiosInstance): void {
    http.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const { refresh_token } = useTokenStore.getState();

          if (!refresh_token) {
            console.warn(
              "⚠️ [UserAuthStrategy] refresh_token 없음 - 로그아웃 처리",
            );

            handleLogout();
            return Promise.reject(error);
          }

          try {
            console.log("🔄 [UserAuthStrategy] 토큰 갱신 시도");
            const tokenData = await getRefreshToken();

            useTokenStore.getState().setToken({
              access_token: tokenData.access_token,
              refresh_token: tokenData.refresh_token || refresh_token,
              scope: tokenData.scope || "",
              token_type: tokenData.token_type || "Bearer",
              expires_in: tokenData.expires_in || 3600,
            });

            console.log("✅ [UserAuthStrategy] 토큰 갱신 성공");
            originalRequest.headers.Authorization = `Bearer ${tokenData.access_token}`;
            return http(originalRequest);
          } catch (refreshError) {
            console.error(
              "❌ [UserAuthStrategy] 토큰 갱신 실패:",
              refreshError,
            );
            handleLogout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
  }
}

class AuthStrategyFactory {
  static create(authType: NonNullable<AuthType>): AuthStrategy {
    switch (authType) {
      case "client":
        return new ClientAuthStrategy();
      case "user":
        return new UserAuthStrategy();
      default:
        throw new Error(`Unknown auth type: ${authType}`);
    }
  }
}

export class API {
  readonly method: HTTPMethod;
  readonly url: string;
  baseURL?: string;
  headers?: HTTPHeaders;
  params?: HTTPParams;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
  authType?: AuthType;

  constructor(method: HTTPMethod, url: string) {
    this.method = method;
    this.url = url;
  }

  call<T>(): AxiosPromise<T> {
    const http = axios.create();

    if (this.authType) {
      const authStrategy = AuthStrategyFactory.create(this.authType);
      authStrategy.setupRequestInterceptor(http);
      authStrategy.setupResponseInterceptor(http);
    }

    return http.request({ ...this });
  }
}

export class APIBuilder {
  private _instance: API;

  constructor(method: HTTPMethod, url: string, data?: unknown) {
    this._instance = new API(method, url);
    this._instance.baseURL = "https://api.spotify.com/v1/";
    this._instance.data = data;
    this._instance.headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
    this._instance.timeout = 5000;
    this._instance.authType = null;
  }

  static get = (url: string): APIBuilder => new APIBuilder("get", url);
  static post = (url: string, data?: unknown): APIBuilder =>
    new APIBuilder("post", url, data);
  static put = (url: string, data?: unknown): APIBuilder =>
    new APIBuilder("put", url, data);
  static delete = (url: string): APIBuilder => new APIBuilder("delete", url);

  baseURL(value: string): APIBuilder {
    this._instance.baseURL = value;
    return this;
  }

  headers(value: HTTPHeaders): APIBuilder {
    this._instance.headers = value;
    return this;
  }

  timeout(value: number): APIBuilder {
    this._instance.timeout = value;
    return this;
  }

  params(value: HTTPParams): APIBuilder {
    this._instance.params = value;
    return this;
  }

  data(value: unknown): APIBuilder {
    this._instance.data = value;
    return this;
  }

  authType(value: AuthType): APIBuilder {
    this._instance.authType = value;
    return this;
  }

  build(): API {
    return this._instance;
  }
}
