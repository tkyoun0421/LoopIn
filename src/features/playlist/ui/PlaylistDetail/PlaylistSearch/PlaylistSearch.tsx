import { memo, useCallback, useMemo, useState } from "react";

import useSearchItemsByKeyword from "@features/playlist/hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "@features/playlist/model/search";

import useDebounce from "@shared/hooks/useDebounce";

import SearchInput from "./SearchInput";
import SearchResultsTable from "./SearchResultsTable";

const PlaylistSearch = memo(() => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchItemsByKeyword({
    q: debouncedKeyword,
    type: [
      SEARCH_TYPE.TRACK,
      SEARCH_TYPE.ALBUM,
      SEARCH_TYPE.PLAYLIST,
      SEARCH_TYPE.ARTIST,
      SEARCH_TYPE.SHOW,
    ],
  });

  const tracks = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page.tracks?.items || []);
  }, [data?.pages]);

  const handleKeywordChange = useCallback((newKeyword: string) => {
    setKeyword(newKeyword);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const LoadingMessage = useMemo(
    () => (
      <div className="flex h-full items-center justify-center">
        <span className="text-[hsl(var(--muted-foreground))]">검색 중...</span>
      </div>
    ),
    [],
  );

  const ErrorMessage = useMemo(
    () => (
      <div className="flex h-full items-center justify-center">
        <span className="text-red-500">
          검색 중 오류가 발생했습니다. 다시 시도해주세요.
        </span>
      </div>
    ),
    [],
  );

  const InitialMessage = useMemo(
    () => (
      <div className="flex h-full items-center justify-center">
        <span className="text-[hsl(var(--muted-foreground))]">
          검색어를 입력하여 트랙을 찾아보세요.
        </span>
      </div>
    ),
    [],
  );

  return (
    <div className="flex h-full flex-col gap-4 px-4">
      <div className="flex-shrink-0">
        <SearchInput
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="트랙, 아티스트, 앨범 검색..."
        />
      </div>

      <div className="flex-1 overflow-hidden">
        {(() => {
          if (debouncedKeyword.length === 0) return InitialMessage;
          if (isLoading) return LoadingMessage;
          if (error) return ErrorMessage;

          return (
            <SearchResultsTable
              tracks={tracks}
              onLoadMore={handleLoadMore}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          );
        })()}
      </div>
    </div>
  );
});

export default PlaylistSearch;
