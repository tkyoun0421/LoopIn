import { Heart } from "lucide-react";
import { JSX } from "react";

import { Playlist } from "@features/playlist/model/playlist";

const PlaylistDetailImage = ({
  playlist,
}: {
  playlist: Playlist;
}): JSX.Element => {
  return (
    <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-lg bg-black/20">
      {playlist.images && playlist.images[0] ? (
        <img
          src={playlist.images[0].url}
          alt={playlist.name || "플레이리스트 커버"}
          className="h-full w-full rounded-lg object-cover"
        />
      ) : (
        <Heart size={48} color="red" />
      )}
    </div>
  );
};

export default PlaylistDetailImage;
