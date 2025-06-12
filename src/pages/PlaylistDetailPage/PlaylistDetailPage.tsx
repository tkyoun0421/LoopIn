import { JSX } from "react";

import useGetPlaylist from "@features/playlist/hooks/useGetPlaylist";
import useGetPlaylistItems from "@features/playlist/hooks/useGetPlaylistItems";
import PlaylistDetailEmpty from "@features/playlist/ui/PlaylistDetail/PlaylistDetailEmpty";
import PlaylistDetailHeader from "@features/playlist/ui/PlaylistDetail/PlaylistDetailHeader";
import PlaylistDetailSkeleton from "@features/playlist/ui/PlaylistDetail/PlaylistDetailSkeleton";
import PlaylistNotFound from "@features/playlist/ui/PlaylistNotFound/PlaylistNotFound";
import PlaylistTracksTable from "@features/playlist/ui/PlaylistTracksTable/PlaylistTracksTable";

const PlaylistDetailPage = (): JSX.Element => {
  const { data: playlist, isLoading: isPlaylistLoading } = useGetPlaylist();
  const {
    data,
    fetchNextPage,
    isLoading: isTrackLoading,
    isError: isTrackError,
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

  if (isTrackError) {
    return <PlaylistNotFound />;
  }

  return (
    <div className="h-full bg-[hsl(var(--secondary))]">
      {playlist && <PlaylistDetailHeader playlist={playlist} />}
      {tracks && tracks.length > 0 ? (
        <PlaylistTracksTable
          tracks={tracks}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage || false}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : (
        <PlaylistDetailEmpty playlistName={playlist?.name} />
      )}
    </div>
  );
};
export default PlaylistDetailPage;
