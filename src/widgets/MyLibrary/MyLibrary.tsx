import { Plus } from "lucide-react";
import { JSX } from "react";

import MyLibraryPlaylist from "@features/playlist/ui/MyLibraryPlaylist";

import Button from "@shared/ui/Button/Button";

import MyLibraryTitle from "./MyLibraryTitle";

const MyLibrary = (): JSX.Element => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 rounded-lg bg-[hsl(var(--background))] p-4">
      <div className="flex items-center justify-between">
        <MyLibraryTitle />
        <Button size="sm" variant="secondary" className="!px-2">
          <Plus />
        </Button>
      </div>
      <MyLibraryPlaylist />
    </div>
  );
};

export default MyLibrary;
