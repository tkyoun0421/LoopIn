import React, { useState } from "react";

type PlaylistFormData = {
  name: string;
  description?: string;
  public: boolean;
  collaborative?: boolean;
};

type UseCreatePlaylistModalReturn = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  formData: PlaylistFormData;
  errors: Partial<PlaylistFormData>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  handleInputChange: (
    field: keyof PlaylistFormData,
    value: string | boolean,
  ) => void;
  validateForm: () => boolean;
  handleSubmit: (
    e: React.FormEvent,
    onSubmit: (data: PlaylistFormData) => void,
  ) => void;
  handleClose: () => void;
  resetForm: (initialData?: Partial<PlaylistFormData>) => void;
};

interface UseCreatePlaylistModalProps {
  initialData?: Partial<PlaylistFormData>;
}

const useCreatePlaylistModal = (
  props: UseCreatePlaylistModalProps = {},
): UseCreatePlaylistModalReturn => {
  const { initialData = {} } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<PlaylistFormData>({
    name: initialData.name || "",
    description: initialData.description || "",
    public: initialData.public ?? true,
  });
  const [errors, setErrors] = useState<Partial<PlaylistFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    field: keyof PlaylistFormData,
    value: string | boolean,
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PlaylistFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "플레이리스트 이름을 입력해주세요.";
    } else if (formData.name.length > 100) {
      newErrors.name = "플레이리스트 이름은 100자 이내로 입력해주세요.";
    }

    if (formData.description && formData.description.length > 300) {
      newErrors.description = "설명은 300자 이내로 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (
    e: React.FormEvent,
    onSubmit: (data: PlaylistFormData) => void,
  ) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("요번 테스트: ", formData);
      onSubmit(formData);
    }
  };

  const resetForm = (resetInitialData?: Partial<PlaylistFormData>) => {
    const dataToUse = resetInitialData || initialData;
    setFormData({
      name: dataToUse.name || "",
      description: dataToUse.description || "",
      public: dataToUse.public ?? true,
      collaborative: dataToUse.collaborative ?? false,
    });
    setErrors({});
  };

  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      setIsOpen(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    formData,
    errors,
    isLoading,
    setIsLoading,
    handleInputChange,
    validateForm,
    handleSubmit,
    handleClose,
    resetForm,
  };
};

export default useCreatePlaylistModal;
export type { PlaylistFormData };
