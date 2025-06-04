import { JSX } from "react";

import useGetNewReleases from "@features/albums/hooks/useGetNewReleases";
import { NEW_RELEASES_ITEM_LIMIT } from "@features/albums/model/albumsConstant";
import AlbumCard from "@features/albums/ui/AlbumCard";
import AlbumCardSkeleton from "@features/albums/ui/AlbumSkeleton";

const NewReleases = (): JSX.Element => {
  const { data, isLoading } = useGetNewReleases();
  const albums = data?.albums.items ?? [];

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">New Releases</h2>
      {isLoading && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: NEW_RELEASES_ITEM_LIMIT }).map((_, idx) => (
            <AlbumCardSkeleton key={idx} />
          ))}
        </div>
      )}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {albums.map(album => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </section>
  );
};

export default NewReleases;
