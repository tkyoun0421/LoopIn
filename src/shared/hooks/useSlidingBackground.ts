import { useEffect, useRef, useState } from "react";

export const useSlidingBackground = ({
  activeIndex,
}: UseSlidingBackgroundOptions): {
  navRef: React.RefObject<HTMLElement | null>;
  currentPosition: ButtonPosition | null;
  isTransitioning: boolean;
  hasValidPosition: boolean;
} => {
  const navRef = useRef<HTMLElement | null>(null);
  const [buttonPositions, setButtonPositions] = useState<ButtonPosition[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const measureButtons = () => {
    if (navRef.current) {
      const buttons = navRef.current.querySelectorAll("a");
      const positions = Array.from(buttons).map(button => {
        const rect = button.getBoundingClientRect();
        const navRect = navRef.current!.getBoundingClientRect();
        return {
          left: rect.left - navRect.left + rect.width / 2,
          width: rect.width,
        };
      });
      setButtonPositions(positions);
    }
  };

  useEffect(() => {
    measureButtons();

    const timer = setTimeout(measureButtons, 100);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    const handleResize = () => {
      measureButtons();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (activeIndex >= 0) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 150);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  const currentPosition = buttonPositions[activeIndex] || null;

  return {
    navRef,
    currentPosition,
    isTransitioning,
    hasValidPosition: Boolean(activeIndex >= 0 && currentPosition),
  };
};

type ButtonPosition = {
  left: number;
  width: number;
};

type UseSlidingBackgroundOptions = {
  activeIndex: number;
  dependencies?: unknown[];
};
