import type { Image } from "@shared/model/sharedType";

/**
 * 원하는 크기에 가장 가까운 이미지를 선택합니다
 */
export const selectOptimalImage = (
  images: Image[] | undefined,
  targetWidth: number,
  targetHeight?: number,
): string | null => {
  if (!images || images.length === 0) return null;

  // 타겟 크기 설정 (높이가 없으면 너비와 동일하게)
  const targetSize = targetHeight || targetWidth;

  // 크기별로 이미지를 정렬하고 가장 적합한 이미지 선택
  const sortedImages = [...images].sort((a, b) => {
    const aDiff =
      Math.abs((a.width || 0) - targetWidth) +
      Math.abs((a.height || 0) - targetSize);
    const bDiff =
      Math.abs((b.width || 0) - targetWidth) +
      Math.abs((b.height || 0) - targetSize);
    return aDiff - bDiff;
  });

  return sortedImages[0]?.url || null;
};

/**
 * 최소 크기 이상의 이미지 중 가장 작은 이미지를 선택합니다 (고품질 보장)
 */
export const selectMinQualityImage = (
  images: Image[] | undefined,
  minWidth: number,
  minHeight?: number,
): string | null => {
  if (!images || images.length === 0) return null;

  const minSize = minHeight || minWidth;

  const qualifiedImages = images.filter(
    img => (img.width || 0) >= minWidth && (img.height || 0) >= minSize,
  );

  if (qualifiedImages.length === 0) {
    const largestImage = images.reduce((largest, current) => {
      const largestSize = (largest.width || 0) * (largest.height || 0);
      const currentSize = (current.width || 0) * (current.height || 0);
      return currentSize > largestSize ? current : largest;
    });
    return largestImage.url;
  }

  const smallestQualified = qualifiedImages.reduce((smallest, current) => {
    const smallestSize = (smallest.width || 0) * (smallest.height || 0);
    const currentSize = (current.width || 0) * (current.height || 0);
    return currentSize < smallestSize ? current : smallest;
  });

  return smallestQualified.url;
};

export const generateSrcSet = (images: Image[] | undefined): string => {
  if (!images || images.length === 0) return "";

  return images
    .filter(img => img.width && img.height)
    .sort((a, b) => (a.width || 0) - (b.width || 0))
    .map(img => `${img.url} ${img.width}w`)
    .join(", ");
};

export const selectImageByPreset = (
  images: Image[] | undefined,
  preset: "thumbnail" | "small" | "medium" | "large" | "profile" | "card",
): string | null => {
  const presetSizes = {
    thumbnail: 48,
    small: 96,
    medium: 192,
    large: 320,
    profile: 80,
    card: 160,
  };

  const targetSize = presetSizes[preset];
  return selectOptimalImage(images, targetSize);
};

export const createRetryImageLoader = (
  imageUrls: string[],
  maxRetries = 3,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let currentIndex = 0;
    let retryCount = 0;

    const tryLoadImage = () => {
      if (currentIndex >= imageUrls.length) {
        if (retryCount < maxRetries) {
          retryCount++;
          currentIndex = 0;
          setTimeout(tryLoadImage, 1000 * retryCount);
          return;
        }
        reject(new Error("All image URLs failed to load"));
        return;
      }

      const img = new Image();
      img.onload = () => resolve(imageUrls[currentIndex]);
      img.onerror = () => {
        currentIndex++;
        tryLoadImage();
      };
      img.src = imageUrls[currentIndex];
    };

    tryLoadImage();
  });
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
};

export const preloadImages = async (urls: string[]): Promise<void> => {
  try {
    await Promise.all(urls.map(preloadImage));
  } catch (error) {
    console.warn("Some images failed to preload:", error);
  }
};
