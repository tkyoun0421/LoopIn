import React, { JSX } from "react";

import { Playlist } from "@features/playlist/model/playlist";

const PlaylistDetailDescription = ({
  playlist,
}: {
  playlist: Playlist;
}): JSX.Element => {
  return (
    <>
      <p className="text-md mb-6">{playlist.description}</p>
    </>
  );
};

export default PlaylistDetailDescription;
