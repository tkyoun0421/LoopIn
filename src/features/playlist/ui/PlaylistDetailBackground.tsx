import React, { JSX } from "react";

import { Playlist } from "@features/playlist/model/playlist";

const PlaylistDetailBackground = ({
  playlist,
}: {
  playlist: Playlist;
}): JSX.Element => {
  return (
    <>
      {playlist.images && playlist.images[0] ? (
        <>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40"></div>
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      )}
    </>
  );
};

export default PlaylistDetailBackground;
