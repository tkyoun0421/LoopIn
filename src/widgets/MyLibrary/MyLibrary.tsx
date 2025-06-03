import { BookMarked, Heart, Plus } from "lucide-react";
import { JSX } from "react";

import Button from "@shared/ui/Button/Button";

const MyLibrary = (): JSX.Element => {
  const playlist: { id: string; title: string; count: number }[] = [];

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-[hsl(var(--background))] p-4">
      <MyLibrary.Title />
      <MyLibrary.PlaylistItem playlist={playlist} />
      <MyLibrary.Button />
    </div>
  );
};

MyLibrary.Title = () => {
  return (
    <div className="flex gap-1.5">
      <BookMarked />
      <h3>My Library</h3>
    </div>
  );
};

interface PlaylistItemProps {
  playlist: { id: string; title: string; count: number }[];
}

MyLibrary.PlaylistItem = ({ playlist }: PlaylistItemProps) => {
  return playlist.length > 0 ? (
    <div className="bg-card flex cursor-pointer gap-3 rounded-lg border border-[hsl(var(--border)/50)] p-4 text-[hsl(var(--card-foreground))] shadow-sm transition-colors hover:bg-[hsl(var(--accent)/0.5)] dark:bg-[hsl(val(--card)/0.3)]">
      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-400/30 dark:to-pink-400/30">
          <Heart size={20} className="text-red-500" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium">내가 좋아하는 음악</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">47곡</p>
      </div>
    </div>
  ) : (
    <p>현재 플레이리스트가 없습니다</p>
  );
};

MyLibrary.Button = () => {
  return (
    <Button className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600">
      <div className="flex gap-1.5">
        <Plus />
        Create New Playlist
      </div>
    </Button>
  );
};

export default MyLibrary;
