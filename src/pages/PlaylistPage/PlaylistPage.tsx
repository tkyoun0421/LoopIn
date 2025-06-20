import { JSX } from "react";

import MyLibrary from "@widgets/MyLibrary/MyLibrary";

const PlaylistPage = (): JSX.Element => {
  return (
    <div className="px-2 py-4 lg:p-6">
      <div className="mb-6">
        <h2 className="text-foreground text-xl font-bold sm:text-2xl">
          내 플레이리스트
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          나만의 음악 컬렉션을 관리해보세요
        </p>
      </div>
      <MyLibrary />
    </div>
  );
};

export default PlaylistPage;
