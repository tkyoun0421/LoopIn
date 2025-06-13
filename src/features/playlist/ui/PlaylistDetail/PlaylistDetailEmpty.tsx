import { josa } from "es-hangul";
import { JSX } from "react";

import PlaylistSearch from "@features/playlist/ui/PlaylistDetail/PlaylistSearch/PlaylistSearch";

interface PlaylistDetailEmptyProps {
  playlistName?: string;
}

const PlaylistDetailEmpty = ({
  playlistName = "플레이리스트",
}: PlaylistDetailEmptyProps): JSX.Element => {
  return (
    <section className="flex min-h-[60vh] min-w-full flex-col items-center py-12">
      <div className="w-full">
        <div className="mb-8 space-y-3 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {josa(playlistName, "이/가")} 비어있어요
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            좋아하는 음악을 검색해서 <br />
            나만의 플레이리스트를 만들어보세요
          </p>
        </div>

        <div className="w-full">
          <PlaylistSearch />
        </div>
      </div>
    </section>
  );
};

export default PlaylistDetailEmpty;
