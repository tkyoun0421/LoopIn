import React, { JSX } from "react";

import { Playlist } from "@features/playlist/model/playlist";

const PlaylistDetailBadge = ({
  playlist,
}: {
  playlist: Playlist;
}): JSX.Element => {
  return (
    <span className="mb-3 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-medium tracking-wide uppercase">
      {playlist.type}
    </span>
  );
};

export default PlaylistDetailBadge;
