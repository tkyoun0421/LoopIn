import { JSX } from "react";

const SlidingBackground = ({
  currentPosition,
  isTransitioning,
  isVisible,
}: SlidingBackgroundProps): JSX.Element | null => {
  if (!isVisible || !currentPosition) return null;

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-md transition-all duration-300 ease-out ${
        isTransitioning ? "scale-50" : "scale-100"
      }`}
      style={{
        left: `${currentPosition.left - (currentPosition.width * 0.95) / 2}px`,
        width: `${currentPosition.width * 0.95}px`,
        height: "3.5rem",
      }}
    />
  );
};

export default SlidingBackground;

type SlidingBackgroundProps = {
  currentPosition: ButtonPosition | null;
  isTransitioning: boolean;
  isVisible: boolean;
};

type ButtonPosition = {
  left: number;
  width: number;
};
