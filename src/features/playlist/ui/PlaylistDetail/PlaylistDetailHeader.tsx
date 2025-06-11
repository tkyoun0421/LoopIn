import { JSX } from "react";

import { Playlist } from "@features/playlist/model/playlist";
import PlaylistDetailBackground from "@features/playlist/ui/PlaylistDetail/PlaylistDetailBackground";
import PlaylistDetailBadge from "@features/playlist/ui/PlaylistDetail/PlaylistDetailBadge";
import PlaylistDetailDescription from "@features/playlist/ui/PlaylistDetail/PlaylistDetailDescription";
import PlaylistDetailImage from "@features/playlist/ui/PlaylistDetail/PlaylistDetailImage";
import PlaylistDetailInfo from "@features/playlist/ui/PlaylistDetail/PlaylistDetailInfo";

const PlaylistDetailHeader = ({
  playlist,
}: {
  playlist: Playlist;
}): JSX.Element => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat p-6"
      style={{
        backgroundImage: playlist.images?.[0]
          ? `url(${playlist.images[0].url})`
          : "linear-gradient(to bottom right, rgb(147 51 234), rgb(236 72 153))",
      }}
    >
      <PlaylistDetailBackground playlist={playlist} />

      <div className="relative z-10 flex gap-6">
        <PlaylistDetailImage playlist={playlist} />
        <div className="flex flex-col text-white">
          <PlaylistDetailBadge playlist={playlist} />
          <h2 className="mb-5 text-3xl font-bold">{playlist?.name}</h2>
          <PlaylistDetailDescription playlist={playlist} />
          <div className="mt-auto flex items-center gap-2">
            <PlaylistDetailInfo playlist={playlist} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default PlaylistDetailHeader;
