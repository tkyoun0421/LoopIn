import { JSX } from "react";

import cn from "@shared/lib/utils/cn";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps): JSX.Element => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[hsl(var(--foreground)/0.4)]",
        className,
      )}
    />
  );
};
