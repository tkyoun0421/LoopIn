import { Plus } from "lucide-react";
import { JSX, useCallback, useState } from "react";

import useAddItemToSpecificPlaylist from "@features/playlist/hooks/useAddItemToSpecificPlaylist";
import { SearchForItemResponse } from "@features/search/models/search";

import { Track } from "@shared/model/sharedType";
import Button from "@shared/ui/Button/Button";
import PlaylistSelectModal from "@shared/ui/PlaylistSelectModal/PlaylistSelectModal";
import TrackTable from "@shared/ui/TrackTable/TrackTable";

const SearchResultTrack = ({
  tracks,
  isLoading = false,
}: SearchResultTrackProps): JSX.Element => {
  const trackItems = tracks?.items || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const { mutate: addItemToSpecificPlaylist, isPending } =
    useAddItemToSpecificPlaylist();

  const renderAddButton = useCallback(
    (track: Track, _index: number) => {
      const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedTrack(track);
        setIsModalOpen(true);
      };

      return (
        <Button
          variant="primary"
          size="sm"
          className="flex items-center gap-1 whitespace-nowrap shadow-md"
          onClick={handleAddClick}
          disabled={isPending}
        >
          <Plus size={16} />
          추가
        </Button>
      );
    },
    [isPending],
  );

  const handlePlaylistSelect = (playlistId: string) => {
    if (selectedTrack) {
      addItemToSpecificPlaylist({
        playlistId,
        trackUris: [selectedTrack.uri],
      });
    }
    setIsModalOpen(false);
    setSelectedTrack(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTrack(null);
  };

  return (
    <>
      <TrackTable
        tracks={trackItems}
        isLoading={isLoading}
        renderAddButton={renderAddButton}
        onTrackClick={(track, index) => {
          console.log("Track clicked:", track, index);
        }}
      />

      <PlaylistSelectModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSelectPlaylist={handlePlaylistSelect}
        trackName={selectedTrack?.name}
      />
    </>
  );
};

export default SearchResultTrack;

type SearchResultTrackProps = {
  tracks: SearchForItemResponse["tracks"];
  isLoading?: boolean;
};
