import { Plus } from "lucide-react";
import { memo, useCallback } from "react";

import useAddItemToPlaylist from "@features/playlist/hooks/useAddItemToPlaylist";

import { Track } from "@shared/model/sharedType";
import Button from "@shared/ui/Button/Button";
import TrackTableWithInfiniteScroll from "@shared/ui/TrackTable/TrackTableWithInfiniteScroll";

type SearchResultsTableProps = {
  tracks: Track[];
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

const SearchResultsTable = memo<SearchResultsTableProps>(
  ({ tracks, onLoadMore, hasNextPage = false, isFetchingNextPage = false }) => {
    const { mutate: addItemToPlaylist, isPending } = useAddItemToPlaylist();

    const renderAddButton = useCallback(
      (track: Track, _index: number) => {
        const handleAddClick = (e: React.MouseEvent) => {
          e.stopPropagation();
          addItemToPlaylist([track.uri]);
        };

        return (
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-1 whitespace-nowrap shadow-md"
            onClick={handleAddClick}
            disabled={isPending}
          >
            <Plus size={16} />
            {isPending ? "추가 중..." : "추가"}
          </Button>
        );
      },
      [addItemToPlaylist, isPending],
    );

    return (
      <TrackTableWithInfiniteScroll
        tracks={tracks}
        renderAddButton={renderAddButton}
        onLoadMore={onLoadMore}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        emptyMessage="검색 결과가 없습니다."
      />
    );
  },
);

export default SearchResultsTable;
