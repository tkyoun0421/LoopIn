import { Plus } from "lucide-react";
import { JSX } from "react";

import getSpotifyAuth from "@features/auth/api/getSpotifyAuth";
import { useTokenStore } from "@features/auth/store/useTokenStore";
import useCreatePlaylistModal from "@features/playlist/hooks/useCreatePlaylistModal";
import MyLibraryPlaylist from "@features/playlist/ui/MyLibraryPlaylist";
import PlaylistModal from "@features/playlist/ui/PlaylistModal/PlaylistModal";

import Button from "@shared/ui/Button/Button";

import MyLibraryTitle from "./MyLibraryTitle";

const MyLibrary = (): JSX.Element => {
  const { access_token } = useTokenStore();
  const { isOpen, setIsOpen } = useCreatePlaylistModal();

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 rounded-lg bg-[hsl(var(--background))] p-4">
      <div className="flex items-center justify-between">
        <MyLibraryTitle />
        <Button
          onClick={access_token ? () => setIsOpen(true) : getSpotifyAuth}
          size="sm"
          variant="secondary"
          className="!px-2"
        >
          <Plus />
        </Button>
        <PlaylistModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={() => {}}
        />
      </div>
      <div className="scrollbar-hide min-h-0 flex-1 overflow-auto">
        <MyLibraryPlaylist />
      </div>
    </div>
  );
};

export default MyLibrary;
