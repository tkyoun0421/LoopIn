import { Heart } from "lucide-react";
import { JSX } from "react";
import { useNavigate } from "react-router";

import { SimplifiedPlaylist } from "@features/playlist/model/playlist";

const MyLibraryPlaylistItem = ({
  playlist,
}: {
  playlist: SimplifiedPlaylist;
}): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-card flex cursor-pointer gap-3 rounded-lg border border-[hsl(var(--border)/50)] p-4 text-[hsl(var(--card-foreground))] shadow-sm transition-colors hover:bg-[hsl(var(--accent)/0.5)] dark:bg-[hsl(val(--card)/0.3)]"
    >
      <div className="flex-shrink-0">
        {playlist.images && playlist.images.length > 0 ? (
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-400/30 dark:to-pink-400/30">
            <Heart size={20} className="text-red-500" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium">{playlist.name}</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {playlist.tracks.total}곡 • {playlist.owner.display_name}
        </p>
      </div>
    </div>
  );
};

export default MyLibraryPlaylistItem;
