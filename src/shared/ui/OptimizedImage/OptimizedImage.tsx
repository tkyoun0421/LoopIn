import { JSX, useState, useRef, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: JSX.Element;
  fallback?: JSX.Element;
  sizes?: string;
  loading?: "lazy" | "eager";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder,
  fallback,
  sizes,
  loading = "lazy",
  objectFit = "cover",
  onLoad,
  onError,
}: OptimizedImageProps): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading === "eager") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const getOptimizedImageUrl = (originalUrl: string): string => {
    if (width || height) {
      const url = new URL(originalUrl);
      if (width) url.searchParams.set("w", width.toString());
      if (height) url.searchParams.set("h", height.toString());
      return url.toString();
    }
    return originalUrl;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const defaultPlaceholder = (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-400/30 dark:to-pink-400/30 ${className}`}
      style={{ width, height }}
    ></div>
  );

  const defaultFallback = (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-400/30 dark:to-pink-400/30 ${className}`}
      style={{ width, height }}
    ></div>
  );

  if (hasError) {
    return fallback || defaultFallback;
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {!isLoaded && (placeholder || defaultPlaceholder)}

      {isInView && (
        <img
          ref={imgRef}
          src={getOptimizedImageUrl(src)}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={`${className} ${!isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          style={{
            objectFit,
            width: width ? `${width}px` : "100%",
            height: height ? `${height}px` : "100%",
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
