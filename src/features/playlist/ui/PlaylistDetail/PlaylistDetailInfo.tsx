import { User } from "lucide-react";
import React, { JSX } from "react";

import { Playlist } from "@features/playlist/model/playlist";

const PlaylistDetailInfo = ({
  playlist,
}: {
  playlist: Playlist;
}): JSX.Element => {
  return (
    <>
      <div className="flex items-center gap-1">
        <User size={14} />
        <p>{playlist.owner.display_name}</p>
      </div>
      <p>{playlist.tracks.total?.toLocaleString("ko-KR")}곡</p>
      <p>{playlist.followers.total?.toLocaleString("ko-KR")}명이 좋아함</p>
    </>
  );
};

export default PlaylistDetailInfo;
