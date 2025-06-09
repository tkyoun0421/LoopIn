import { JSX } from "react";

import { Skeleton } from "@shared/ui/Skeleton/Skeleton";

interface Props {
  length: number;
}

const PlaylistSkeleton = ({ length }: Props): JSX.Element => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="bg-card flex gap-3 rounded-lg border border-[hsl(var(--border)/50)] p-4 text-[hsl(var(--card-foreground))] shadow-sm dark:bg-[hsl(val(--card)/0.3)]"
        >
          <div className="flex-shrink-0">
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
};

export default PlaylistSkeleton;
