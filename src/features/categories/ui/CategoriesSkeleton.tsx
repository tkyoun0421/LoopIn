import { JSX } from "react";

import { Skeleton } from "@shared/ui/Skeleton/Skeleton";

interface Props {
  length: number;
}

const CategoriesSkeleton = ({ length }: Props): JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="aspect-[3/2] rounded-lg bg-gray-200 dark:bg-gray-800"
        >
          <div className="flex h-full flex-col justify-between p-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-16 w-16 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSkeleton;
