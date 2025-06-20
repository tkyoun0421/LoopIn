import { AxiosInstance } from "axios";

export type AuthStrategy = {
  setupRequestInterceptor(http: AxiosInstance): void;
  setupResponseInterceptor(http: AxiosInstance): void;
};

export type HTTPMethod = "get" | "post" | "put" | "delete";
export type HTTPHeaders = Record<string, string>;
export type HTTPParams = Record<string, unknown>;

export type AuthType = "client" | "user" | null;
