import { Clock, Play } from "lucide-react";
import { JSX } from "react";

import { Track } from "@features/playlist/model/playlist";
import { SearchForItemResponse } from "@features/search/models/search";

import { formatDuration } from "@shared/lib/utils/formatDuration";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/Table/Table";

interface SearchResultTrackProps {
  tracks: SearchForItemResponse["tracks"];
  isLoading?: boolean;
}

const getSearchTrackImage = (track: Track): string | null => {
  return track.album?.images?.[0]?.url || null;
};

const getSearchTrackArtists = (track: Track): string => {
  return (
    track.artists?.map(artist => artist.name).join(", ") || "Unknown Artist"
  );
};

const getSearchTrackAlbum = (track: Track): string => {
  return track.album?.name || "N/A";
};

const SearchResultTrack = ({
  tracks,
  isLoading = false,
}: SearchResultTrackProps): JSX.Element => {
  if (isLoading) {
    return (
      <section>
        <h3 className="mb-4 text-xl font-semibold">곡</h3>
        <div className="flex h-96 items-center justify-center">
          <div className="text-[hsl(var(--muted-foreground))]">검색 중...</div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h3 className="mb-4 text-xl font-semibold">곡</h3>
      <div className="flex max-h-96 flex-col rounded-lg">
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
            </TableRow>
          </TableHeader>
        </Table>

        <div className="scrollbar-hide flex-1 overflow-y-auto">
          <Table>
            <TableBody>
              {tracks?.items.map((track, index) => {
                const trackImage = getSearchTrackImage(track);
                const artistNames = getSearchTrackArtists(track);
                const albumName = getSearchTrackAlbum(track);

                return (
                  <TableRow
                    key={`${track.id}-${index}`}
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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default SearchResultTrack;
