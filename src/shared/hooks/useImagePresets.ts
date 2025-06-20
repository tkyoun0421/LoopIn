interface ImagePreset {
  width: number;
  height: number;
  sizes: string;
  className: string;
}

interface ImagePresets {
  thumbnail: ImagePreset;
  small: ImagePreset;
  medium: ImagePreset;
  large: ImagePreset;
  banner: ImagePreset;
  profile: ImagePreset;
  card: ImagePreset;
}

const useImagePresets = (): ImagePresets => {
  return {
    thumbnail: {
      width: 48,
      height: 48,
      sizes: "(max-width: 640px) 48px, 48px",
      className: "w-12 h-12 rounded-lg object-cover",
    },
    small: {
      width: 96,
      height: 96,
      sizes: "(max-width: 640px) 96px, 96px",
      className: "w-24 h-24 rounded-lg object-cover",
    },
    medium: {
      width: 192,
      height: 192,
      sizes: "(max-width: 640px) 128px, (max-width: 768px) 160px, 192px",
      className:
        "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg object-cover",
    },
    large: {
      width: 320,
      height: 320,
      sizes: "(max-width: 640px) 192px, (max-width: 768px) 256px, 320px",
      className:
        "w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-lg object-cover",
    },
    banner: {
      width: 640,
      height: 192,
      sizes: "(max-width: 640px) 100vw, (max-width: 768px) 640px, 640px",
      className: "w-full h-48 rounded-lg object-cover",
    },
    profile: {
      width: 80,
      height: 80,
      sizes: "(max-width: 640px) 64px, 80px",
      className: "w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover",
    },
    card: {
      width: 160,
      height: 160,
      sizes: "(max-width: 640px) 120px, (max-width: 768px) 140px, 160px",
      className: "aspect-square w-full rounded-lg object-cover",
    },
  };
};

export default useImagePresets;
