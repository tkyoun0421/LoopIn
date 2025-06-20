import { Heart } from "lucide-react";
import { JSX } from "react";

import { Playlist } from "@features/playlist/model/playlist";

import { selectImageByPreset } from "@shared/lib/utils/imageUtils";
import OptimizedImage from "@shared/ui/OptimizedImage/OptimizedImage";

const PlaylistDetailImage = ({
  playlist,
}: {
  playlist: Playlist;
}): JSX.Element => {
  const optimizedImageUrl = selectImageByPreset(playlist.images, "large");

  return (
    <div className="flex aspect-square w-full max-w-sm shrink-0 items-center justify-center rounded-lg bg-black/20 sm:h-48 sm:w-48">
      {optimizedImageUrl ? (
        <OptimizedImage
          src={optimizedImageUrl}
          alt={playlist.name || "플레이리스트 커버"}
          className="h-full w-full rounded-lg object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 192px, 320px"
          loading="eager"
          objectFit="cover"
          fallback={<Heart size={48} color="red" />}
        />
      ) : (
        <Heart size={48} color="red" />
      )}
    </div>
  );
};

export default PlaylistDetailImage;
