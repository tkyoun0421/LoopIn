import { Play } from "lucide-react";
import { JSX, ReactNode } from "react";

import Button from "@shared/ui/Button/Button";
import OptimizedImage from "@shared/ui/OptimizedImage/OptimizedImage";

const Card = ({
  image,
  isPlay = true,
  children,
  priority = false,
  loading,
}: CardProps): JSX.Element => {
  const imageLoading = loading || (priority ? "eager" : "lazy");

  return (
    <div className="group cursor-pointer rounded-lg border border-[hsl(var(--border))] transition-shadow hover:shadow-lg dark:bg-[hsl(var(--card)/0.5)]">
      <div className="p-3">
        <div className="relative mb-3">
          {image ? (
            <OptimizedImage
              src={image}
              alt="thumbnail"
              className="mb-2 aspect-square w-full rounded-lg object-cover"
              loading={imageLoading}
              objectFit="cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          ) : (
            <div className="mb-2 aspect-square rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-400/30 dark:to-pink-400/30" />
          )}

          {isPlay && (
            <Button
              size={"sm"}
              className="absolute right-1 bottom-1 h-8 w-8 bg-gradient-to-r from-purple-600 to-pink-600 !px-0 opacity-0 transition-opacity group-hover:opacity-100 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600"
            >
              <Play size={14} />
            </Button>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};

export default Card;

interface CardProps {
  image?: string;
  isPlay?: boolean;
  children: ReactNode;
  priority?: boolean; // LCP 요소인 경우 true로 설정
  loading?: "lazy" | "eager";
}
