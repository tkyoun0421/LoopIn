import { JSX } from "react";

import { SearchForItemResponse } from "@features/search/models/search";

import { formatRelativeDate } from "@shared/lib/utils/formatRelativeDate";
import { Album, Artist } from "@shared/model/sharedType";
import Card from "@shared/ui/Card/Card";

interface SearchResultAlbumProps {
  albums: SearchForItemResponse["albums"];
  isLoading?: boolean;
}

const SearchResultAlbum = ({
  albums,
  isLoading = false,
}: SearchResultAlbumProps): JSX.Element => {
  if (isLoading) {
    return (
      <section>
        <h3 className="mb-4 text-xl font-semibold">앨범</h3>
        <div className="flex h-96 items-center justify-center">
          <div className="text-[hsl(var(--muted-foreground))]">검색 중...</div>
        </div>
      </section>
    );
  }

  if (!albums || albums.items.length === 0) {
    return (
      <section>
        <h3 className="mb-4 text-xl font-semibold">앨범</h3>
        <div className="flex h-48 items-center justify-center">
          <div className="text-[hsl(var(--muted-foreground))]">
            검색 결과가 없습니다.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h3 className="mb-4 text-xl font-semibold">앨범</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {albums.items.map((album: Album) => {
          const imageUrl = album.images?.[0]?.url;

          return (
            <Card key={album.id} image={imageUrl}>
              <h3 className="truncate text-sm font-medium">{album.name}</h3>
              <p className="truncate text-xs text-[hsl(var(--muted-foreground))]">
                {album.artists?.map((artist: Artist) => artist.name).join(", ")}
              </p>
              <p className="mt-1 text-xs text-purple-600 dark:text-purple-400">
                {formatRelativeDate(album.release_date)}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default SearchResultAlbum;
