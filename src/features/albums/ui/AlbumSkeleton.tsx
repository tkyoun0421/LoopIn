import { JSX } from "react";

import { Skeleton } from "@shared/ui/Skeleton/Skeleton";

const AlbumCardSkeleton = (): JSX.Element => {
  return (
    <div className="group rounded-lg border border-[hsl(var(--border))] transition-shadow dark:bg-[hsl(var(--card)/0.5)]">
      <div className="p-3">
        <div className="relative mb-3">
          <Skeleton className="aspect-square w-full rounded-lg" />
        </div>
        <Skeleton className="mb-2 h-4 w-3/4" />
        <Skeleton className="mb-1 h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
};

export default AlbumCardSkeleton;
