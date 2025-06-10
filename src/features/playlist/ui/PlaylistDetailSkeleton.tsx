import { JSX } from "react";

import { Skeleton } from "@shared/ui/Skeleton/Skeleton";

const PlaylistDetailSkeleton = (): JSX.Element => {
  return (
    <div className="h-full bg-[hsl(var(--secondary))]">
      <section className="bg-[hsl(var(--muted))] p-6">
        <div className="flex gap-6">
          <Skeleton className="h-48 w-48 shrink-0 rounded-lg bg-black/20" />

          <div className="flex flex-col text-white">
            <Skeleton className="mb-3 h-6 w-16 rounded-full bg-black/20" />

            <Skeleton className="mb-5 h-8 w-64 bg-black/20" />

            <Skeleton className="mb-6 h-4 w-80 bg-black/20" />
            <Skeleton className="mb-6 h-4 w-60 bg-black/20" />

            <div className="mt-auto flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4 bg-black/20" />
                <Skeleton className="h-4 w-20 bg-black/20" />
              </div>
              <Skeleton className="h-4 w-16 bg-black/20" />
              <Skeleton className="h-4 w-24 bg-black/20" />
            </div>
          </div>
        </div>
      </section>
      <section className="p-6">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <Skeleton className="h-12 w-12" />
              <div className="flex-1">
                <Skeleton className="mb-1 h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default PlaylistDetailSkeleton;
