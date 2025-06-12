import { JSX } from "react";

import useCreatePlaylistModal from "@features/playlist/hooks/useCreatePlaylistModal";
import { PlaylistFormData } from "@features/playlist/model/playlist";

import Button from "@shared/ui/Button/Button";
import Input from "@shared/ui/Input/Input";
import Modal from "@shared/ui/Modal/Modal";
import Switch from "@shared/ui/Switch/Switch";
import Textarea from "@shared/ui/Textarea/Textarea";

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<PlaylistFormData>;
  mode?: "create" | "edit";
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const PlaylistModal = ({
  isOpen,
  onClose,
  initialData = {},
  mode = "create",
  onSuccess,
  onError,
}: PlaylistModalProps): JSX.Element => {
  const {
    formData,
    errors,
    updateField,
    handleSubmit,
    isCreating,
    resetAndClose,
  } = useCreatePlaylistModal({
    initialData,
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
    onError,
  });

  const handleClose = () => {
    resetAndClose();
    onClose();
  };

  const title =
    mode === "create" ? "새 플레이리스트 만들기" : "플레이리스트 편집";

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title} size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="플레이리스트 이름 *"
          value={formData.name}
          onChange={e => updateField("name", e.target.value)}
          placeholder="예: 내가 좋아하는 음악"
          maxLength={100}
          showCharCount
          maxCharCount={100}
          error={errors.name}
          disabled={isCreating}
        />

        <Textarea
          label="설명"
          value={formData.description}
          onChange={e => updateField("description", e.target.value)}
          placeholder="이 플레이리스트에 대해 설명해주세요..."
          rows={3}
          maxLength={300}
          showCharCount
          maxCharCount={300}
          error={errors.description}
          disabled={isCreating}
          helperText="설명은 선택사항입니다."
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Switch
              checked={formData.public}
              onChange={e => updateField("public", e.target.checked)}
              label="공개 플레이리스트"
              description={
                formData.public
                  ? "다른 사용자가 이 플레이리스트를 볼 수 있습니다"
                  : "나만 볼 수 있는 비공개 플레이리스트입니다"
              }
              disabled={isCreating}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 border-t border-[hsl(var(--border))] pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isCreating}
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={isCreating || !formData.name.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isCreating
              ? "저장 중..."
              : mode === "create"
                ? "만들기"
                : "수정하기"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PlaylistModal;
