import { JSX } from "react";

import { formatRelativeDate } from "@shared/lib/utils/formatRelativeDate";
import { Album, Artist, Track } from "@shared/model/sharedType";
import Card from "@shared/ui/Card/Card";

const YearEndCard = ({ item, type }: YearEndCardProps): JSX.Element => {
  const getImageUrl = () => {
    if ("images" in item && item.images?.[0]) {
      return item.images[0].url;
    }
    if ("album" in item && item.album?.images?.[0]) {
      return item.album.images[0].url;
    }
    return undefined;
  };

  const renderContent = () => {
    switch (type) {
      case "album":
        const album = item as Album;
        return (
          <>
            <h3 className="truncate text-sm font-medium">{album.name}</h3>
            <p className="truncate text-xs text-[hsl(var(--muted-foreground))]">
              {album.artists?.map(artist => artist.name).join(", ")}
            </p>
            <p className="mt-1 text-xs text-purple-600 dark:text-purple-400">
              {formatRelativeDate(album.release_date)}
            </p>
          </>
        );

      case "track":
        const track = item as Track;
        return (
          <>
            <h3 className="truncate text-sm font-medium">{track.name}</h3>
            <p className="truncate text-xs text-[hsl(var(--muted-foreground))]">
              {track.artists?.map(artist => artist.name).join(", ")}
            </p>
            <p className="mt-1 text-xs text-purple-600 dark:text-purple-400">
              인기도: {track.popularity}/100
            </p>
          </>
        );

      case "artist":
      case "rookie":
        const artist = item as Artist;
        return (
          <>
            <h3 className="truncate text-sm font-medium">
              {artist.name}{" "}
              {type === "rookie" && <span className="text-yellow-500">🌟</span>}
            </h3>
            <p className="truncate text-xs text-[hsl(var(--muted-foreground))]">
              팔로워: {artist.followers?.total?.toLocaleString() || 0}명
            </p>
            <p className="mt-1 text-xs text-purple-600 dark:text-purple-400">
              인기도: {artist.popularity}/100
            </p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Card image={getImageUrl()} isPlay={type !== "artist" && type !== "rookie"}>
      {renderContent()}
    </Card>
  );
};

export default YearEndCard;

type YearEndCardProps = {
  item: Album | Track | Artist;
  type: "album" | "track" | "artist" | "rookie";
};
