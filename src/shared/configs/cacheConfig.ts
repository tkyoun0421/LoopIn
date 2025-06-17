// React Query 캐싱 설정 상수들

export const LONG_CACHE_CONFIG = {
  staleTime: 1000 * 60 * 30,
  gcTime: 1000 * 60 * 60 * 2,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
} as const;

export const SHORT_CACHE_CONFIG = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: true,
} as const;

export const MEDIUM_CACHE_CONFIG = {
  staleTime: 1000 * 60 * 15,
  gcTime: 1000 * 60 * 30,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
} as const;

export const PERMANENT_CACHE_CONFIG = {
  staleTime: Infinity,
  gcTime: 1000 * 60 * 60 * 24,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
} as const;
