import { JSX, useRef } from "react";

import getSpotifyAuth from "@features/auth/api/getSpotifyAuth";
import { useTokenStore } from "@features/auth/store/useTokenStore";
import useGetCurrentUserPlaylists from "@features/playlist/hooks/useGetCurrentUserPlaylists";
import EmptyLibrary from "@features/playlist/ui/EmptyLibrary";
import MyLibraryPlaylistItem from "@features/playlist/ui/MyLibraryPlaylistItem";
import PlaylistAuthPrompt from "@features/playlist/ui/PlaylistAuthPrompt/PlaylistAuthPrompt";
import PlaylistSkeleton from "@features/playlist/ui/PlaylistSkeleton";

import useIntersectionObserver from "@shared/hooks/useIntersectionObserver";

const MyLibraryPlaylist = (): JSX.Element => {
  const { access_token } = useTokenStore();

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

  const containerRef = useRef<HTMLDivElement>(null);
  const { targetRef } = useIntersectionObserver({
    threshold: 1,
    root: containerRef.current ?? undefined,
    rootMargin: "100px",
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (!access_token) {
    return (
      <PlaylistAuthPrompt
        playlistName="내 라이브러리"
        onLoginClick={getSpotifyAuth}
      />
    );
  }

  const pages = data?.pages || [];
  const allPlaylists = pages.flatMap(page => page.items).flat() ?? [];

  if (isLoading) {
    return (
      <div
        ref={containerRef}
        className="flex h-96 flex-col gap-2 overflow-auto"
      >
        <PlaylistSkeleton length={5} />
      </div>
    );
  }

  if (isError || !data || allPlaylists.length === 0) {
    return <EmptyLibrary />;
  }

  return (
    <div
      ref={containerRef}
      className="scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 flex min-h-0 flex-1 flex-col gap-2 overflow-auto"
    >
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
