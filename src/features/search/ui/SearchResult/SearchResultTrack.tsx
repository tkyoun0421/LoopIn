import { josa } from "es-hangul";
import { Plus } from "lucide-react";
import { JSX, useCallback, useState } from "react";

import getSpotifyAuth from "@features/auth/api/getSpotifyAuth";
import { useTokenStore } from "@features/auth/store/useTokenStore";
import useAddItemToSpecificPlaylist from "@features/playlist/hooks/useAddItemToSpecificPlaylist";
import { SearchForItemResponse } from "@features/search/models/search";

import useToast from "@shared/hooks/useToast";
import { Track } from "@shared/model/sharedType";
import Button from "@shared/ui/Button/Button";
import PlaylistSelectModal from "@shared/ui/PlaylistSelectModal/PlaylistSelectModal";
import TrackTable from "@shared/ui/TrackTable/TrackTable";

type SearchResultTrackProps = {
  tracks: SearchForItemResponse["tracks"];
  isLoading?: boolean;
};

const SearchResultTrack = ({
  tracks,
  isLoading = false,
}: SearchResultTrackProps): JSX.Element => {
  const trackItems = tracks?.items || [];
  const { access_token } = useTokenStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const { success, error } = useToast();

  const { mutate: addItemToSpecificPlaylist, isPending } =
    useAddItemToSpecificPlaylist();

  const renderAddButton = useCallback(
    (track: Track, _index: number) => {
      const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!access_token) {
          return getSpotifyAuth();
        }
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
    [isPending, access_token],
  );

  const handlePlaylistSelect = (playlistId: string) => {
    if (selectedTrack) {
      addItemToSpecificPlaylist(
        {
          playlistId,
          trackUris: [selectedTrack.uri],
        },
        {
          onSuccess: () => {
            success({
              title: "플레이리스트에 추가됨",
              message: `"${josa(selectedTrack.name, "이/가")}" 플레이리스트에 추가되었습니다.`,
            });
          },
          onError: _err => {
            error({
              title: "추가 실패",
              message: "플레이리스트에 곡을 추가하는 중 오류가 발생했습니다.",
            });
          },
        },
      );
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
