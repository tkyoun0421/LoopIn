import { Clock, Play } from "lucide-react";
import { JSX, ReactNode } from "react";

import { formatDuration } from "@shared/lib/utils/formatDuration";
import {
  getAlbumName,
  getArtistNames,
  getTrackImage,
} from "@shared/lib/utils/track";
import { Track } from "@shared/model/sharedType";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/Table/Table";

const TrackTable = ({
  tracks,
  isLoading = false,
  renderAddButton,
  onTrackClick,
  loadingMessage = "검색 중...",
  emptyMessage = "검색 결과가 없습니다.",
  footer,
  className = "",
}: TrackTableProps): JSX.Element => {
  if (isLoading) {
    return (
      <section className={className}>
        <div className="flex h-96 items-center justify-center">
          <div className="text-[hsl(var(--muted-foreground))]">
            {loadingMessage}
          </div>
        </div>
      </section>
    );
  }

  if (!tracks || tracks.length === 0) {
    return (
      <section className={className}>
        <div className="flex h-48 items-center justify-center">
          <div className="text-[hsl(var(--muted-foreground))]">
            {emptyMessage}
          </div>
        </div>
      </section>
    );
  }

  const hasAddButton = !!renderAddButton;

  return (
    <section className={className}>
      <div className="flex flex-col rounded-lg">
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
              {hasAddButton && <TableHead className="w-0 p-0"></TableHead>}
            </TableRow>
          </TableHeader>
        </Table>

        <div className="flex-1">
          <Table>
            <TableBody>
              {tracks.map((track, index) => {
                const trackImage = getTrackImage(track);
                const artistNames = getArtistNames(track);
                const albumName = getAlbumName(track);

                return (
                  <TableRow
                    key={`${track.id}-${index}`}
                    className={`group ${onTrackClick ? "cursor-pointer" : ""} ${hasAddButton ? "relative hover:bg-[hsl(var(--muted)/0.5)]" : ""}`}
                    onClick={() => onTrackClick?.(track, index)}
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
                            loading="lazy"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-medium text-[hsl(var(--foreground))]">
                            {track.name}
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

                    <TableCell className="w-20 px-4 text-center text-[hsl(var(--muted-foreground))]">
                      {formatDuration(track.duration_ms)}
                    </TableCell>

                    {hasAddButton && (
                      <TableCell className="relative w-0 p-0">
                        <div className="pointer-events-none absolute top-1/2 right-4 z-10 -translate-y-1/2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                          {renderAddButton(track, index)}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {footer}
      </div>
    </section>
  );
};

export default TrackTable;

type TrackTableProps = {
  tracks: Track[];
  isLoading?: boolean;
  renderAddButton?: (track: Track, index: number) => ReactNode;
  onTrackClick?: (track: Track, index: number) => void;
  loadingMessage?: string;
  emptyMessage?: string;
  footer?: ReactNode;
  className?: string;
};
