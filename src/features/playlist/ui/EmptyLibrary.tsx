import { JSX } from "react";

import MyLibraryButton from "@features/playlist/ui/MyLibraryButton";

const EmptyLibrary = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-[hsl(var(--muted-foreground))]">
        나만의 플레이리스트를 만들어보세요!
      </p>
      <MyLibraryButton />
    </div>
  );
};

export default EmptyLibrary;
