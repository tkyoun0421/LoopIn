import { QueryKey } from "@tanstack/react-query";

import { queryKey } from "@shared/constants/queryKey";

export const generateQueryKey = (...args: string[]): QueryKey => {
  return [[...queryKey.newRelease], ...args];
};
