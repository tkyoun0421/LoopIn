import { JSX } from "react";

import MyLibraryButton from "./MyLibraryButton";
import MyLibraryPlaylistItem from "./MyLibraryPlaylistItem";
import MyLibraryTitle from "./MyLibraryTitle";

const MyLibrary = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-[hsl(var(--background))] p-4">
      <MyLibraryTitle />
      <MyLibraryPlaylistItem />
      <MyLibraryButton />
    </div>
  );
};

export default MyLibrary;
