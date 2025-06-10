import { JSX } from "react";

import useGetPlaylist from "@features/playlist/hooks/useGetPlaylist";
import PlaylistDetailHeader from "@features/playlist/ui/PlaylistDetailHeader";
import PlaylistDetailSkeleton from "@features/playlist/ui/PlaylistDetailSkeleton";

const PlaylistDetailPage = (): JSX.Element => {
  const { data: playlist, isLoading } = useGetPlaylist();

  console.log("playlist: ", playlist);

  if (isLoading) {
    return <PlaylistDetailSkeleton />;
  }

  return (
    <div className="h-full bg-[hsl(var(--secondary))]">
      {playlist && <PlaylistDetailHeader playlist={playlist} />}
      <section className="p-6"></section>
    </div>
  );
};
export default PlaylistDetailPage;
