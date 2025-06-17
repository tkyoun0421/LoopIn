import { InfiniteData } from "@tanstack/react-query";
import { JSX, useCallback, useMemo } from "react";

import useGetInfiniteSearchForItem from "@features/search/hooks/useGetInfinitySearchForItem";
import useSearchBar from "@features/search/hooks/useSearchBar";
import { SearchForItemResponse } from "@features/search/models/search";
import SearchResultSkeleton from "@features/search/ui/SearchResult/SearchResultSkeleton";
import SearchResultTrack from "@features/search/ui/SearchResult/SearchResultTrack";

import useIntersectionObserver from "@shared/hooks/useIntersectionObserver";

const INFINITE_QUERY_LIMIT = 20;

const TrackTabContent = (): JSX.Element => {
  const { keyword } = useSearchBar();

  const {
    data: infiniteData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteSearchForItem({
    q: keyword,
    type: "track",
    limit: INFINITE_QUERY_LIMIT,
  });

  const aggregatedTrackData = useMemo(() => {
    const typedInfiniteData = infiniteData as
      | InfiniteData<SearchForItemResponse>
      | undefined;
    if (!typedInfiniteData?.pages || typedInfiniteData.pages.length === 0)
      return undefined;

    const firstPage = typedInfiniteData.pages[0];
    if (!firstPage?.tracks) return undefined;

    const allTracks = typedInfiniteData.pages.flatMap(
      (page: SearchForItemResponse) => page.tracks?.items || [],
    );

    return {
      ...firstPage.tracks,
      items: allTracks,
    };
  }, [infiniteData]);

  const handleInfiniteScroll = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { targetRef: scrollRef } = useIntersectionObserver({
    onIntersect: handleInfiniteScroll,
  });

  if (isLoading) {
    return <SearchResultSkeleton type="track" count={INFINITE_QUERY_LIMIT} />;
  }

  return (
    <div className="space-y-6">
      <SearchResultTrack tracks={aggregatedTrackData} isLoading={false} />
      {hasNextPage && (
        <div ref={scrollRef} className="flex justify-center py-4">
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            {isFetchingNextPage
              ? "더 많은 결과를 불러오는 중..."
              : "스크롤하여 더 보기"}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackTabContent;
