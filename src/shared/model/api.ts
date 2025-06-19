import { AxiosInstance } from "axios";

export type AuthStrategy = {
  setupRequestInterceptor(http: AxiosInstance): void;
  setupResponseInterceptor(http: AxiosInstance): void;
};

export type HTMLMethod = "get" | "post" | "put" | "delete";
export type HTMLHeaders = Record<string, string>;
export type HTMLParams = Record<string, unknown>;

export type AuthType = "client" | "user" | null;
