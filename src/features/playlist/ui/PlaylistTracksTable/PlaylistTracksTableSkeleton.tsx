import { JSX } from "react";

import { Skeleton } from "@shared/ui/Skeleton/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/Table/Table";

interface PlaylistTracksTableSkeletonProps {
  rows?: number;
}

const PlaylistTracksTableSkeleton = ({
  rows = 5,
}: PlaylistTracksTableSkeletonProps): JSX.Element => {
  return (
    <div className="flex h-[calc(100vh-200px)] flex-col rounded-lg">
      <Table>
        <TableHeader className="bg-black/20">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-16 px-4 !text-center">
              <Skeleton className="h-4 w-4 bg-black/20" />
            </TableHead>
            <TableHead className="px-4">
              <Skeleton className="h-4 w-6 bg-black/20" />
            </TableHead>
            <TableHead className="hidden px-4 lg:table-cell">
              <Skeleton className="h-4 w-6 bg-black/20" />
            </TableHead>
            <TableHead className="hidden px-4 !text-center md:table-cell">
              <Skeleton className="h-4 w-20 bg-black/20" />
            </TableHead>
            <TableHead className="w-20 px-4 text-center">
              <div className="flex justify-center">
                <Skeleton className="h-4 w-10 bg-black/20" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <Table>
          <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow key={index} className="animate-pulse">
                <TableCell className="w-16 px-4 text-center">
                  <div className="flex items-center justify-center">
                    <Skeleton className="h-4 w-6 bg-black/20" />
                  </div>
                </TableCell>
                <TableCell className="px-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded bg-black/20" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="mb-1 h-4 w-48 bg-black/20" />
                      <Skeleton className="h-3 w-32 bg-black/20" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden px-4 lg:table-cell">
                  <Skeleton className="h-4 w-36 bg-black/20" />
                </TableCell>
                <TableCell className="hidden px-4 text-center md:table-cell">
                  <Skeleton className="h-4 w-20 bg-black/20" />
                </TableCell>
                <TableCell className="w-20 px-4 text-center">
                  <Skeleton className="h-4 w-10 bg-black/20" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PlaylistTracksTableSkeleton;
