import { JSX } from "react";

import { Skeleton } from "@shared/ui/Skeleton/Skeleton";

interface YearEndCardSkeletonProps {
  length: number;
}

const YearEndCardSkeleton = ({
  length,
}: YearEndCardSkeletonProps): JSX.Element => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="group rounded-lg border border-[hsl(var(--border))] transition-shadow dark:bg-[hsl(var(--card)/0.5)]"
        >
          <div className="p-3">
            <div className="relative mb-3">
              <Skeleton className="aspect-square w-full rounded-lg" />
            </div>
            <Skeleton className="mb-2 h-4 w-3/4" />
            <Skeleton className="mb-1 h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </>
  );
};

export default YearEndCardSkeleton;
