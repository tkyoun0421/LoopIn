import { Clock, Play } from "lucide-react";
import { JSX } from "react";

import {
  getAlbumName,
  getArtistNames,
  getTrackImage,
} from "@features/playlist/lib/trackUtils";
import { PlaylistItem } from "@features/playlist/model/playlist";

import useIntersectionObserver from "@shared/hooks/useIntersectionObserver";
import { formatToYYYYMMDD } from "@shared/lib/utils/formatDate";
import { formatDuration } from "@shared/lib/utils/formatDuration";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/Table/Table";

interface PlaylistTracksTableProps {
  tracks: PlaylistItem[];
  fetchNextPage: () => Promise<any>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const PlaylistTracksTable = ({
  tracks,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PlaylistTracksTableProps): JSX.Element => {
  const { targetRef } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    threshold: 0.1,
  });

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col rounded-lg">
      <Table>
        <TableHeader className="bg-background">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-16 px-4 !text-center">#</TableHead>
            <TableHead className="px-4">제목</TableHead>
            <TableHead className="hidden px-4 lg:table-cell">앨범</TableHead>
            <TableHead className="hidden px-4 !text-center md:table-cell">
              추가한 날짜
            </TableHead>
            <TableHead className="w-20 px-4 text-center">
              <div className="flex justify-center">
                <Clock size={16} />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <Table>
          <TableBody>
            {tracks.map((item, index) => {
              const trackImage = getTrackImage(item.track);
              const artistNames = getArtistNames(item.track);
              const albumName = getAlbumName(item.track);

              return (
                <TableRow
                  key={`${item.track.id}-${index}`}
                  className="group cursor-pointer"
                >
                  <TableCell className="w-16 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <span className="text-[hsl(var(--muted-foreground))] group-hover:hidden">
                        {index + 1}
                      </span>
                      <Play
                        size={16}
                        className="hidden fill-current text-[hsl(var(--foreground))] group-hover:block"
                      />
                    </div>
                  </TableCell>

                  <TableCell className="px-4">
                    <div className="flex items-center gap-3">
                      {trackImage && (
                        <img
                          src={trackImage}
                          alt={albumName}
                          className="h-10 w-10 rounded object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium text-[hsl(var(--foreground))]">
                          {item.track.name}
                        </div>
                        <div className="truncate text-sm text-[hsl(var(--muted-foreground))]">
                          {artistNames}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="hidden px-4 text-[hsl(var(--muted-foreground))] lg:table-cell">
                    <div className="truncate">{albumName}</div>
                  </TableCell>

                  <TableCell className="hidden px-4 text-center text-[hsl(var(--muted-foreground))] md:table-cell">
                    <div className="whitespace-nowrap">
                      {formatToYYYYMMDD(item.added_at)}
                    </div>
                  </TableCell>

                  <TableCell className="w-20 px-4 text-center text-[hsl(var(--muted-foreground))]">
                    {formatDuration(item.track.duration_ms)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {hasNextPage && (
          <div ref={targetRef} className="py-8 text-center">
            {isFetchingNextPage ? (
              <div className="flex items-center justify-center gap-2 text-[hsl(var(--muted-foreground))]">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                더 많은 곡을 불러오는 중...
              </div>
            ) : (
              <div className="text-[hsl(var(--muted-foreground))]">
                스크롤하여 더 많은 곡 보기
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistTracksTable;
