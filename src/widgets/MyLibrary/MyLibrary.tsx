import { Plus } from "lucide-react";
import { JSX } from "react";

import getSpotifyAuth from "@features/auth/api/getSpotifyAuth";
import { useTokenStore } from "@features/auth/store/useTokenStore";
import MyLibraryPlaylist from "@features/playlist/ui/MyLibraryPlaylist";

import Button from "@shared/ui/Button/Button";

import MyLibraryTitle from "./MyLibraryTitle";

const MyLibrary = (): JSX.Element => {
  const { access_token } = useTokenStore();

  //TODO: 나중에 플레이리스트 훅으로 구현
  const handleClick = () => {
    if (!access_token) {
      console.log("실행");
      getSpotifyAuth();
    } else {
      console.log("플레이 리스트 추가 구현");
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 rounded-lg bg-[hsl(var(--background))] p-4">
      <div className="flex items-center justify-between">
        <MyLibraryTitle />
        <Button
          onClick={handleClick}
          size="sm"
          variant="secondary"
          className="!px-2"
        >
          <Plus />
        </Button>
      </div>
      <div className="scrollbar-hide min-h-0 flex-1 overflow-auto">
        <MyLibraryPlaylist />
      </div>
    </div>
  );
};

export default MyLibrary;
