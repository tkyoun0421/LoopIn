import { apiInstance } from "@shared/configs/api";

const postCache = new Map<string, Promise<unknown>>();

export const memoizedPostRequest = <T>(
  url: string,
  body: URLSearchParams,
  headers?: Record<string, string>,
): Promise<T> => {
  const cacheKey = `${url}?${body.toString()}`;

  if (postCache.has(cacheKey)) {
    return postCache.get(cacheKey)! as Promise<T>;
  }

  const request = apiInstance
    .post(url, body, { headers })
    .then(res => res.data)
    .finally(() => {
      postCache.delete(cacheKey);
    });

  postCache.set(cacheKey, request);
  return request;
};
