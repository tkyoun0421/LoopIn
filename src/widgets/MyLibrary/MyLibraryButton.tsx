import { Plus } from "lucide-react";
import { JSX } from "react";

import Button from "@shared/ui/Button/Button";

const MyLibraryButton = (): JSX.Element => {
  return (
    <Button className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600">
      <div className="flex gap-1.5">
        <Plus />
        Create New Playlist
      </div>
    </Button>
  );
};

export default MyLibraryButton;
