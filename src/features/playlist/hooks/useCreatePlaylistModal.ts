import React from "react";

import useCreatePlaylist from "@features/playlist/hooks/useCreatePlaylist";
import usePlaylistForm from "@features/playlist/hooks/usePlaylistForm";
import {
  PlaylistFormData,
  PlaylistFormErrors,
} from "@features/playlist/model/playlist";

import useModal from "@shared/hooks/useModal";

const useCreatePlaylistModal = ({
  initialData,
  onSuccess,
  onError,
}: UseCreatePlaylistModalProps = {}): UseCreatePlaylistModalReturn => {
  const modal = useModal();
  const form = usePlaylistForm({ initialData });
  const createMutation = useCreatePlaylist();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.validateForm()) {
      createMutation.mutate(form.formData, {
        onSuccess: () => {
          form.resetForm();
          modal.close();
          onSuccess?.();
        },
        onError: error => {
          console.error("플레이리스트 생성 실패:", error);
          onError?.(error);
        },
      });
    }
  };

  const resetAndClose = () => {
    if (!createMutation.isPending) {
      form.resetForm();
      modal.close();
    }
  };

  return {
    isOpen: modal.isOpen,
    openModal: modal.open,
    closeModal: resetAndClose,
    formData: form.formData,
    errors: form.errors,
    updateField: form.updateField,
    hasErrors: form.hasErrors,
    handleSubmit,
    isCreating: createMutation.isPending,

    resetAndClose,
  };
};

export default useCreatePlaylistModal;

type UseCreatePlaylistModalProps = {
  initialData?: Partial<PlaylistFormData>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

type UseCreatePlaylistModalReturn = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;

  formData: PlaylistFormData;
  errors: PlaylistFormErrors;
  updateField: (field: keyof PlaylistFormData, value: string | boolean) => void;
  hasErrors: boolean;

  handleSubmit: (e: React.FormEvent) => void;
  isCreating: boolean;

  resetAndClose: () => void;
};
