import { QueryClient } from "@tanstack/react-query";

import { SHORT_CACHE_CONFIG } from "@shared/configs/cacheConfig";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      ...SHORT_CACHE_CONFIG,
    },
    mutations: {
      retry: 1,
    },
  },
});
