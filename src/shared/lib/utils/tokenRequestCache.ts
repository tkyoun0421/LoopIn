import axios from "axios";

const postCache = new Map<string, Promise<any>>();

export const memoizedPostRequest = (
  url: string,
  body: URLSearchParams,
  headers?: Record<string, string>,
): Promise<any> => {
  const cacheKey = `${url}?${body.toString()}`;

  if (postCache.has(cacheKey)) {
    return postCache.get(cacheKey)!;
  }

  const request = axios
    .post(url, body, { headers })
    .then(res => res.data)
    .finally(() => {
      postCache.delete(cacheKey);
    });

  postCache.set(cacheKey, request);
  return request;
};
