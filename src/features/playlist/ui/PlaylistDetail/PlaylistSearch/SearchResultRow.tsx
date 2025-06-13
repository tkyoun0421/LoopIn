import { Play, Plus } from "lucide-react";
import { memo, useCallback, useMemo } from "react";

import {
  getAlbumName,
  getArtistNames,
  getTrackImage,
} from "@features/playlist/lib/trackUtils";
import type { Track } from "@features/playlist/model/playlist";

import { formatDuration } from "@shared/lib/utils/formatDuration";
import Button from "@shared/ui/Button/Button";
import { TableCell, TableRow } from "@shared/ui/Table/Table";

interface SearchResultRowProps {
  track: Track;
  index: number;
}

const SearchResultRow = memo<SearchResultRowProps>(({ track, index }) => {
  const trackInfo = useMemo(
    () => ({
      image: getTrackImage(track as any),
      artistNames: getArtistNames(track as any),
      albumName: getAlbumName(track as any),
      duration: formatDuration(track.duration_ms),
    }),
    [track],
  );

  const handleAddClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      // TODO: 실제 플레이리스트에 트랙 추가 로직 구현
      console.log("트랙 추가:", track.name, "by", trackInfo.artistNames);
      alert(`"${track.name}" 트랙이 플레이리스트에 추가되었습니다!`);
    },
    [track, trackInfo.artistNames],
  );

  return (
    <TableRow className="group relative cursor-pointer hover:bg-[hsl(var(--muted)/0.5)]">
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
          {trackInfo.image && (
            <img
              src={trackInfo.image}
              alt={trackInfo.albumName}
              className="h-10 w-10 rounded object-cover"
              loading="lazy"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium text-[hsl(var(--foreground))]">
              {track.name}
            </div>
            <div className="truncate text-sm text-[hsl(var(--muted-foreground))]">
              {trackInfo.artistNames}
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell className="hidden px-4 text-[hsl(var(--muted-foreground))] lg:table-cell">
        <div className="truncate">{trackInfo.albumName}</div>
      </TableCell>

      <TableCell className="w-20 px-4 text-center text-[hsl(var(--muted-foreground))]">
        {trackInfo.duration}
      </TableCell>

      <TableCell className="relative w-0 p-0">
        <div className="pointer-events-none absolute top-1/2 right-4 z-10 -translate-y-1/2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-1 whitespace-nowrap shadow-md"
            onClick={handleAddClick}
          >
            <Plus size={16} />
            추가
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
});

export default SearchResultRow;
