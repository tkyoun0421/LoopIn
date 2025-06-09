import { JSX } from "react";

import useGetCurrentUserPlaylists from "@features/playlist/hooks/useGetCurrentUserPlaylists";
import EmptyLibrary from "@features/playlist/ui/EmptyLibrary";
import MyLibraryPlaylistItem from "@features/playlist/ui/MyLibraryPlaylistItem";
import PlaylistSkeleton from "@features/playlist/ui/PlaylistSkeleton";

import useIntersectionObserver from "@shared/hooks/useIntersectionObserver";

const MyLibraryPlaylist = (): JSX.Element => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 10,
  });

  const { targetRef } = useIntersectionObserver({
    threshold: 1,
    rootMargin: "100px",
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const pages = data?.pages || [];
  const allPlaylists = pages.flatMap(page => page.items).flat() ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <PlaylistSkeleton length={5} />
      </div>
    );
  }

  if (isError || !data || allPlaylists.length === 0) {
    return <EmptyLibrary />;
  }

  return (
    <div className="flex flex-col gap-2">
      {allPlaylists.map(playlist => (
        <MyLibraryPlaylistItem key={playlist.id} playlist={playlist} />
      ))}

      {hasNextPage && (
        <div ref={targetRef} className="flex flex-col gap-2">
          {isFetchingNextPage && <PlaylistSkeleton length={3} />}
        </div>
      )}
    </div>
  );
};

export default MyLibraryPlaylist;
