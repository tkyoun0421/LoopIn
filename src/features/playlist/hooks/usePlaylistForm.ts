import { useState, useCallback } from "react";

import { validatePlaylistForm } from "@features/playlist/lib/playlistValidation";
import {
  PlaylistFormData,
  PlaylistFormErrors,
} from "@features/playlist/model/playlist";

const DEFAULT_FORM_DATA: PlaylistFormData = {
  name: "",
  description: "",
  public: true,
  collaborative: false,
};

const usePlaylistForm = ({
  initialData = {},
}: UsePlaylistFormProps = {}): UsePlaylistFormReturn => {
  const [formData, setFormData] = useState<PlaylistFormData>({
    ...DEFAULT_FORM_DATA,
    ...initialData,
  });
  const [errors, setErrors] = useState<PlaylistFormErrors>({});

  const updateField = useCallback(
    (field: keyof PlaylistFormData, value: string | boolean) => {
      setFormData(prev => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  const validateForm = useCallback((): boolean => {
    const newErrors = validatePlaylistForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const resetForm = useCallback(
    (newInitialData?: Partial<PlaylistFormData>) => {
      const dataToUse = newInitialData || initialData;
      setFormData({ ...DEFAULT_FORM_DATA, ...dataToUse });
      setErrors({});
    },
    [initialData],
  );

  const hasErrors = Object.keys(errors).length > 0;

  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
    hasErrors,
  };
};

export default usePlaylistForm;

type UsePlaylistFormProps = {
  initialData?: Partial<PlaylistFormData>;
};

type UsePlaylistFormReturn = {
  formData: PlaylistFormData;
  errors: PlaylistFormErrors;
  updateField: (field: keyof PlaylistFormData, value: string | boolean) => void;
  validateForm: () => boolean;
  resetForm: (newInitialData?: Partial<PlaylistFormData>) => void;
  hasErrors: boolean;
};
