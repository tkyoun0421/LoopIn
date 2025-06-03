import { JSX } from "react";

import cn from "@shared/lib/utils/cn";

const Skeleton = ({ className }: { className?: string }): JSX.Element => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[hsl(var(--muted))]",
        className,
      )}
    />
  );
};

export default Skeleton;
