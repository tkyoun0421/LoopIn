import { JSX } from "react";

import useGetPlaylist from "@features/playlist/hooks/useGetPlaylist";
import useGetPlaylistItems from "@features/playlist/hooks/useGetPlaylistItems";
import PlaylistDetailHeader from "@features/playlist/ui/PlaylistDetail/PlaylistDetailHeader";
import PlaylistDetailSkeleton from "@features/playlist/ui/PlaylistDetail/PlaylistDetailSkeleton";
import PlaylistTracksTable from "@features/playlist/ui/PlaylistTracksTable/PlaylistTracksTable";

const PlaylistDetailPage = (): JSX.Element => {
  const { data: playlist, isLoading: isPlaylistLoading } = useGetPlaylist();
  const {
    data,
    fetchNextPage,
    isLoading: isTrackLoading,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPlaylistItems();

  const tracks = data?.pages.flatMap(page => page.items);

  if (isPlaylistLoading || isTrackLoading) {
    return (
      <>
        <PlaylistDetailSkeleton />
      </>
    );
  }

  return (
    <div className="h-full bg-[hsl(var(--secondary))]">
      {playlist && <PlaylistDetailHeader playlist={playlist} />}
      {tracks && (
        <PlaylistTracksTable
          tracks={tracks}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage || false}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
};
export default PlaylistDetailPage;
