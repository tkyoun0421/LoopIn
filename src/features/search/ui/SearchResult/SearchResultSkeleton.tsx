import { JSX } from "react";

import { Skeleton } from "@shared/ui/Skeleton/Skeleton";

interface SearchResultSkeletonProps {
  type: "track" | "artist" | "album" | "all";
  count?: number;
}

const SearchResultSkeleton = ({
  type,
  count = 5,
}: SearchResultSkeletonProps): JSX.Element => {
  const renderTrackSkeleton = () => (
    <div className="rounded-lg">
      <div className="overflow-hidden rounded-lg border border-[hsl(var(--border))]">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="w-16 px-4 py-3">
                <Skeleton className="mx-auto h-4 w-4" />
              </th>
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-12" />
              </th>
              <th className="hidden px-4 py-3 text-left lg:table-cell">
                <Skeleton className="h-4 w-12" />
              </th>
              <th className="w-20 px-4 py-3">
                <Skeleton className="mx-auto h-4 w-4" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: count }, (_, index) => (
              <tr key={index} className="border-t border-[hsl(var(--border))]">
                <td className="w-16 px-4 py-3 text-center">
                  <Skeleton className="mx-auto h-4 w-4" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 lg:table-cell">
                  <Skeleton className="h-4 w-2/3" />
                </td>
                <td className="w-20 px-4 py-3 text-center">
                  <Skeleton className="mx-auto h-4 w-8" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderArtistSkeleton = () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="rounded-lg border border-[hsl(var(--border))] p-3"
        >
          <div className="mb-3">
            <Skeleton className="mb-2 aspect-square w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-16" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAlbumSkeleton = () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="rounded-lg border border-[hsl(var(--border))] p-3"
        >
          <div className="relative mb-3">
            <Skeleton className="mb-2 aspect-square w-full rounded-lg" />
            <Skeleton className="absolute right-1 bottom-1 h-8 w-8 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderAllSkeleton = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        {renderTrackSkeleton()}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        {renderArtistSkeleton()}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        {renderAlbumSkeleton()}
      </div>
    </div>
  );

  switch (type) {
    case "track":
      return renderTrackSkeleton();
    case "artist":
      return renderArtistSkeleton();
    case "album":
      return renderAlbumSkeleton();
    case "all":
      return renderAllSkeleton();
    default:
      return <div />;
  }
};

export default SearchResultSkeleton;
