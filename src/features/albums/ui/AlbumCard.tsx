import { JSX } from "react";

import { formatRelativeDate } from "@shared/lib/utils/formatRelativeDate";
import { Album, Artist } from "@shared/model/sharedType";
import Card from "@shared/ui/Card/Card";

interface AlbumCardProps {
  album: Album;
}

const AlbumCard = ({ album }: AlbumCardProps): JSX.Element => {
  const { images, name, artists, release_date } = album;
  const imageUrl = images[0]?.url;

  return (
    <Card image={imageUrl}>
      <h3 className="truncate text-sm font-medium">{name}</h3>
      <p className="truncate text-xs text-[hsl(var(--muted-foreground))]">
        {artists.map((artist: Artist) => artist.name).join(", ")}
      </p>
      <p className="mt-1 text-xs text-purple-600 dark:text-purple-400">
        {formatRelativeDate(release_date)}
      </p>
    </Card>
  );
};

export default AlbumCard;
