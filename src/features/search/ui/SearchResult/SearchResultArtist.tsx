import { User } from "lucide-react";
import { JSX } from "react";

import { SearchForItemResponse } from "@features/search/models/search";

import { Artist } from "@shared/model/sharedType";
import Card from "@shared/ui/Card/Card";

type SearchResultArtistProps = {
  artists: SearchForItemResponse["artists"];
  isLoading?: boolean;
};

const SearchResultArtist = ({
  artists,
  isLoading = false,
}: SearchResultArtistProps): JSX.Element => {
  if (isLoading) {
    return (
      <section>
        <div className="flex h-96 items-center justify-center">
          <div className="text-[hsl(var(--muted-foreground))]">검색 중...</div>
        </div>
      </section>
    );
  }

  if (!artists || artists.items.length === 0) {
    return (
      <section>
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {artists.items.map((artist: Artist) => {
          const imageUrl = artist.images?.[0]?.url || undefined;

          return (
            <Card key={artist.id} image={imageUrl} isPlay={false}>
              <h3 className="truncate text-sm font-medium">{artist.name}</h3>
              <p className="truncate text-xs text-[hsl(var(--muted-foreground))]">
                아티스트
              </p>
              <div className="mt-1 flex items-center gap-1">
                <User
                  size={12}
                  className="text-purple-600 dark:text-purple-400"
                />
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  {artist.followers.total?.toLocaleString("ko-KR")}명
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default SearchResultArtist;
