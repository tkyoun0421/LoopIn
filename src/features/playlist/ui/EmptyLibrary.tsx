import { JSX } from "react";

import useCreatePlaylistModal from "@features/playlist/hooks/useCreatePlaylistModal";
import MyLibraryButton from "@features/playlist/ui/MyLibraryButton";
import PlaylistModal from "@features/playlist/ui/PlaylistModal/PlaylistModal";

const EmptyLibrary = (): JSX.Element => {
  const { isOpen, openModal, closeModal } = useCreatePlaylistModal();

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          나만의 플레이리스트를 만들어보세요!
        </p>
        <MyLibraryButton onClick={openModal} />
      </div>

      <PlaylistModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default EmptyLibrary;
