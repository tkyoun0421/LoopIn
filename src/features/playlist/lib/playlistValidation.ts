import {
  PlaylistFormData,
  PlaylistFormErrors,
} from "@features/playlist/model/playlist";

const VALIDATION_MESSAGES = {
  NAME_REQUIRED: "플레이리스트 이름을 입력해주세요.",
  NAME_TOO_LONG: "플레이리스트 이름은 100자 이내로 입력해주세요.",
  DESCRIPTION_TOO_LONG: "설명은 300자 이내로 입력해주세요.",
} as const;

const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 300;

export const validatePlaylistForm = (
  formData: PlaylistFormData,
): PlaylistFormErrors => {
  const errors: PlaylistFormErrors = {};

  if (!formData.name.trim()) {
    errors.name = VALIDATION_MESSAGES.NAME_REQUIRED;
  } else if (formData.name.length > MAX_NAME_LENGTH) {
    errors.name = VALIDATION_MESSAGES.NAME_TOO_LONG;
  }

  if (
    formData.description &&
    formData.description.length > MAX_DESCRIPTION_LENGTH
  ) {
    errors.description = VALIDATION_MESSAGES.DESCRIPTION_TOO_LONG;
  }

  return errors;
};
