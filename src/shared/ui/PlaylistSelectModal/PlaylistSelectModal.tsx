import { josa } from "es-hangul";
import { JSX } from "react";

import { SimplifiedPlaylist } from "@features/playlist/model/playlist";

import usePlaylistSelect from "@shared/hooks/usePlaylistSelect";
import Button from "@shared/ui/Button/Button";
import Modal from "@shared/ui/Modal/Modal";

const PlaylistSelectModal = ({
  isOpen,
  onClose,
  onSelectPlaylist,
  trackName = "이 곡",
}: PlaylistSelectModalProps): JSX.Element => {
  const {
    playlists,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    scrollContainerRef,
    scrollRef,
  } = usePlaylistSelect(isOpen);

  const handlePlaylistSelect = (playlist: SimplifiedPlaylist) => {
    onSelectPlaylist(playlist.id);
    onClose();
  };

  const renderEmptyState = () => (
    <div className="flex h-48 flex-col items-center justify-center space-y-4">
      <p className="text-sm text-[hsl(var(--muted-foreground))]">
        플레이리스트가 없습니다.
      </p>
      <Button variant="outline" onClick={onClose}>
        새 플레이리스트 만들기
      </Button>
    </div>
  );

  const renderLoadingState = () => (
    <div className="flex h-48 items-center justify-center">
      <div className="text-[hsl(var(--muted-foreground))]">
        플레이리스트를 불러오는 중...
      </div>
    </div>
  );

  const renderPlaylistItem = (playlist: SimplifiedPlaylist) => (
    <div
      key={playlist.id}
      onClick={() => handlePlaylistSelect(playlist)}
      className="flex cursor-pointer items-center gap-3 rounded-lg border border-[hsl(var(--border))] p-3 transition-colors hover:bg-[hsl(var(--accent)/0.5)]"
    >
      <div className="flex-shrink-0">
        {playlist.images && playlist.images.length > 0 ? (
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <span className="text-lg">🎵</span>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium">{playlist.name}</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {playlist.tracks.total}곡
        </p>
      </div>
    </div>
  );

  const renderScrollTrigger = () => {
    if (!hasNextPage) return null;

    return (
      <div ref={scrollRef} className="py-4 text-center">
        {isFetchingNextPage ? (
          <div className="flex items-center justify-center gap-2 text-[hsl(var(--muted-foreground))]">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            더 많은 플레이리스트를 불러오는 중...
          </div>
        ) : (
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            스크롤하여 더 많은 플레이리스트 보기
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="플레이리스트에 추가"
      size="md"
    >
      <div className="space-y-4">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {josa(trackName, "을/를")} 추가할 플레이리스트를 선택하세요.
        </p>

        {isLoading ? (
          renderLoadingState()
        ) : playlists.length === 0 ? (
          renderEmptyState()
        ) : (
          <div
            ref={scrollContainerRef}
            className="max-h-96 space-y-2 overflow-y-auto"
          >
            {playlists.map(renderPlaylistItem)}
            {renderScrollTrigger()}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PlaylistSelectModal;

type PlaylistSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlaylist: (playlistId: string) => void;
  trackName?: string;
};
