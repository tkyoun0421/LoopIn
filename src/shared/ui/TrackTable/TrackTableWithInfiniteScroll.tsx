import { memo, ReactNode, useMemo } from "react";

import useIntersectionObserver from "@shared/hooks/useIntersectionObserver";
import { Track } from "@shared/model/sharedType";
import TrackTable from "@shared/ui/TrackTable/TrackTable";

const TrackTableWithInfiniteScroll = memo<TrackTableWithInfiniteScrollProps>(
  ({
    tracks,
    isLoading = false,
    renderAddButton,
    onTrackClick,
    onLoadMore,
    hasNextPage = false,
    isFetchingNextPage = false,
    loadingMessage = "검색 중...",
    emptyMessage = "검색 결과가 없습니다.",
    className = "flex h-[calc(100vh-300px)] flex-col rounded-lg",
  }) => {
    const { targetRef } = useIntersectionObserver({
      onIntersect: () => {
        if (hasNextPage && !isFetchingNextPage) {
          onLoadMore();
        }
      },
    });

    const infiniteScrollFooter = useMemo(() => {
      if (!hasNextPage || tracks.length === 0) return null;

      return (
        <div ref={targetRef} className="py-8 text-center">
          {isFetchingNextPage ? (
            <div className="flex items-center justify-center gap-2 text-[hsl(var(--muted-foreground))]">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              더 많은 결과를 불러오는 중...
            </div>
          ) : (
            <div className="text-[hsl(var(--muted-foreground))]">
              스크롤하여 더 많은 결과 보기
            </div>
          )}
        </div>
      );
    }, [hasNextPage, isFetchingNextPage, tracks.length, targetRef]);

    return (
      <div className={className}>
        <div className="scrollbar-hide flex-1 overflow-y-auto">
          <TrackTable
            tracks={tracks}
            isLoading={isLoading}
            renderAddButton={renderAddButton}
            onTrackClick={onTrackClick}
            loadingMessage={loadingMessage}
            emptyMessage={emptyMessage}
            footer={infiniteScrollFooter}
          />
        </div>
      </div>
    );
  },
);

export default TrackTableWithInfiniteScroll;

type TrackTableWithInfiniteScrollProps = {
  tracks: Track[];
  isLoading?: boolean;
  renderAddButton?: (track: Track, index: number) => ReactNode;
  onTrackClick?: (track: Track, index: number) => void;
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  loadingMessage?: string;
  emptyMessage?: string;
  className?: string;
};
