import { QueryKey } from "@tanstack/react-query";

export const generateQueryKey = (
  queryKey: string,
  ...args: unknown[]
): QueryKey => {
  return [queryKey, ...args];
};
