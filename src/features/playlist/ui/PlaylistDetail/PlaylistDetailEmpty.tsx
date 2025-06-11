import { josa } from "es-hangul";
import { Search, Plus } from "lucide-react";
import { JSX, useState } from "react";

import Button from "@shared/ui/Button/Button";

interface PlaylistDetailEmptyProps {
  onSearchClick?: () => void;
  playlistName?: string;
}

const PlaylistDetailEmpty = ({
  onSearchClick,
  playlistName = "플레이리스트",
}: PlaylistDetailEmptyProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearchClick) {
      onSearchClick();
    }
  };

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-8 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {josa(playlistName, "이/가")} 비어있어요
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            좋아하는 음악을 검색해서 <br />
            나만의 플레이리스트를 만들어보세요
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="mb-6 space-y-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="곡명, 아티스트, 앨범을 검색해보세요"
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-11 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400"
            />
          </div>

          <Button
            type="submit"
            disabled={!searchQuery.trim()}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-400"
          >
            <Plus className="mr-2 h-4 w-4" />
            음악 검색하기
          </Button>
        </form>
      </div>
    </section>
  );
};

export default PlaylistDetailEmpty;
