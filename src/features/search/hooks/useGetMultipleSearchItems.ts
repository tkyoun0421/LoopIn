import { useQueries } from "@tanstack/react-query";

import useGetClientAuthToken from "@features/auth/hooks/useClientAuthToken";
import getSearchForItem from "@features/search/api/getSearchForItem";
import { SearchForItemResponse } from "@features/search/models/search";

import { LONG_CACHE_CONFIG } from "@shared/configs/cacheConfig";
import { Artist, Track, Album } from "@shared/model/sharedType";

const YEAR_END_SEARCH_ITEMS = {
  artists: ["에스파", "단편선과 선원들", "실리카겔", "로제", "이승윤"],
  tracks: [
    "비비 밤양갱",
    "에스파 supanova",
    "APT",
    "단편선 순간들 독립",
    "수민 왜,왜,왜",
  ],
  albums: [
    "단편선 순간들 음악만세",
    "수민 미니시리즈2",
    "aespa armageddon",
    "혁오 sunset rollercoaster",
    "실리카겔 power andre",
  ],
  rookies: ["산만한 시선", "주혜린", "삼산", "아일릿", "최미루"],
};

const useGetMultipleSearchItems = (
  customSearchItems?: Partial<typeof YEAR_END_SEARCH_ITEMS>,
): {
  results: SearchResults;
  isAllLoading: boolean;
  hasErrors: boolean;
} => {
  const clientToken = useGetClientAuthToken();

  const searchItems = {
    artists: customSearchItems?.artists || YEAR_END_SEARCH_ITEMS.artists,
    tracks: customSearchItems?.tracks || YEAR_END_SEARCH_ITEMS.tracks,
    albums: customSearchItems?.albums || YEAR_END_SEARCH_ITEMS.albums,
    rookies: customSearchItems?.rookies || YEAR_END_SEARCH_ITEMS.rookies,
  };

  const allQueries: Array<{
    query: string;
    type: "artist" | "track" | "album";
    isRookie?: boolean;
  }> = [
    ...searchItems.artists.map(query => ({ query, type: "artist" as const })),
    ...searchItems.tracks.map(query => ({ query, type: "track" as const })),
    ...searchItems.albums.map(query => ({ query, type: "album" as const })),
    ...searchItems.rookies.map(query => ({
      query,
      type: "artist" as const,
      isRookie: true,
    })),
  ];

  const queries = useQueries({
    queries: allQueries.map(({ query, type, isRookie = false }) => ({
      queryKey: ["searchItem", type, query, isRookie],
      queryFn: (): Promise<SearchForItemResponse> => {
        if (!clientToken) {
          throw new Error("토큰을 사용할 수 없습니다.");
        }
        return getSearchForItem(clientToken, {
          q: query,
          type,
          limit: 1,
        });
      },
      enabled: !!clientToken && !!query.trim(),
      ...LONG_CACHE_CONFIG,
    })),
  });

  let currentIndex = 0;

  const artistResults: SearchItemResult<Artist>[] = searchItems.artists.map(
    searchQuery => {
      const query = queries[currentIndex++];
      return {
        searchQuery,
        item: query.data?.artists?.items?.[0] || null,
        isLoading: query.isLoading,
        error: query.error,
      };
    },
  );

  const trackResults: SearchItemResult<Track>[] = searchItems.tracks.map(
    searchQuery => {
      const query = queries[currentIndex++];
      return {
        searchQuery,
        item: query.data?.tracks?.items?.[0] || null,
        isLoading: query.isLoading,
        error: query.error,
      };
    },
  );

  const albumResults: SearchItemResult<Album>[] = searchItems.albums.map(
    searchQuery => {
      const query = queries[currentIndex++];
      return {
        searchQuery,
        item: query.data?.albums?.items?.[0] || null,
        isLoading: query.isLoading,
        error: query.error,
      };
    },
  );

  const rookieResults: SearchItemResult<Artist>[] = searchItems.rookies.map(
    searchQuery => {
      const query = queries[currentIndex++];
      return {
        searchQuery,
        item: query.data?.artists?.items?.[0] || null,
        isLoading: query.isLoading,
        error: query.error,
      };
    },
  );

  const results: SearchResults = {
    artists: artistResults,
    tracks: trackResults,
    albums: albumResults,
    rookies: rookieResults,
  };

  const isAllLoading = queries.some(query => query.isLoading);
  const hasErrors = queries.some(query => !!query.error);

  return {
    results,
    isAllLoading,
    hasErrors,
  };
};

export default useGetMultipleSearchItems;

export type SearchItemType = "artist" | "track" | "album" | "rookie";

export type SearchItemResult<T = Artist | Track | Album> = {
  searchQuery: string;
  item: T | null;
  isLoading: boolean;
  error: Error | null;
};

export type SearchResults = {
  artists: SearchItemResult<Artist>[];
  tracks: SearchItemResult<Track>[];
  albums: SearchItemResult<Album>[];
  rookies: SearchItemResult<Artist>[];
};
