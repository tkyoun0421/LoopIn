import { Clock } from "lucide-react";
import { memo, useMemo } from "react";

import type { Track } from "@features/playlist/model/playlist";

import useIntersectionObserver from "@shared/hooks/useIntersectionObserver";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/Table/Table";

import SearchResultRow from "./SearchResultRow";

interface SearchResultsTableProps {
  tracks: Track[];
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

const SearchResultsTable = memo<SearchResultsTableProps>(
  ({ tracks, onLoadMore, hasNextPage = false, isFetchingNextPage = false }) => {
    const { targetRef } = useIntersectionObserver({
      onIntersect: () => {
        if (hasNextPage && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      threshold: 0.1,
    });

    const EmptyMessage = useMemo(
      () => (
        <div className="flex h-full items-center justify-center py-16">
          <span className="text-[hsl(var(--muted-foreground))]">
            검색 결과가 없습니다.
          </span>
        </div>
      ),
      [],
    );

    return (
      <div className="flex h-[calc(100vh-300px)] flex-col rounded-lg">
        <Table>
          <TableHeader className="bg-background">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16 px-4 !text-center">#</TableHead>
              <TableHead className="px-4">제목</TableHead>
              <TableHead className="hidden px-4 lg:table-cell">앨범</TableHead>
              <TableHead className="w-20 px-4 text-center">
                <div className="flex justify-center">
                  <Clock size={16} />
                </div>
              </TableHead>
              <TableHead className="w-0 p-0"></TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <div className="scrollbar-hide flex-1 overflow-y-auto">
          {tracks.length > 0 ? (
            <>
              <Table>
                <TableBody>
                  {tracks.map((track, index) => (
                    <SearchResultRow
                      key={`${track.id}-${track.name}-${index}`}
                      track={track}
                      index={index}
                    />
                  ))}
                </TableBody>
              </Table>

              {hasNextPage && (
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
              )}
            </>
          ) : (
            EmptyMessage
          )}
        </div>
      </div>
    );
  },
);

export default SearchResultsTable;
