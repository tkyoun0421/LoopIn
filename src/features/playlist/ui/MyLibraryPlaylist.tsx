import { JSX } from "react";

import useGetCurrentUserPlaylists from "@features/playlist/hooks/useGetCurrentUserPlaylists";
import EmptyLibrary from "@features/playlist/ui/EmptyLibrary";
import MyLibraryPlaylistItem from "@features/playlist/ui/MyLibraryPlaylistItem";

const MyLibraryPlaylist = (): JSX.Element => {
  const { data, isLoading, isError } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });
  console.log("data", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <EmptyLibrary />;
  }

  return (
    <div className="flex flex-col gap-2">
      {data.items && data.items.length > 0 ? (
        data.items.map(playlist => (
          <MyLibraryPlaylistItem key={playlist.id} playlist={playlist} />
        ))
      ) : (
        <EmptyLibrary />
      )}
    </div>
  );
};

export default MyLibraryPlaylist;
