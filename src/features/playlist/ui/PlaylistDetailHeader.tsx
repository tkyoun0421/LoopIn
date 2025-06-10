import { Heart, User } from "lucide-react";
import { JSX } from "react";

import { Playlist } from "@features/playlist/model/playlist";

const PlaylistDetailHeader = ({
  playlist,
}: {
  playlist: Playlist;
}): JSX.Element => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat p-6"
      style={{
        backgroundImage: playlist?.images?.[0]
          ? `url(${playlist.images[0].url})`
          : "linear-gradient(to bottom right, rgb(147 51 234), rgb(236 72 153))",
      }}
    >
      {playlist?.images?.[0] ? (
        <>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40"></div>
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      )}

      <div className="relative z-10 flex gap-6">
        <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-lg bg-black/20">
          {playlist?.images?.[0] ? (
            <img
              src={playlist.images[0].url}
              alt={playlist.name || "플레이리스트 커버"}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <Heart size={48} color="white" />
          )}
        </div>
        <div className="flex flex-col text-white">
          {playlist?.type && (
            <span className="mb-3 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-medium tracking-wide uppercase">
              {playlist.type}
            </span>
          )}
          <h2 className="mb-5 text-3xl font-bold">{playlist?.name}</h2>
          {playlist?.description && (
            <p className="text-md mb-6">{playlist?.description}</p>
          )}
          <div className="mt-auto flex items-center gap-2">
            <div className="flex items-center gap-1">
              <User size={14} />
              <p>{playlist?.owner.display_name}</p>
            </div>
            <p>{playlist?.tracks.total?.toLocaleString("ko-KR")}곡</p>
            <p>
              {playlist?.followers.total?.toLocaleString("ko-KR")}명이 좋아함
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PlaylistDetailHeader;
