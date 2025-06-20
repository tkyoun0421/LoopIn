import { JSX } from "react";

import useGetNewReleases from "@features/albums/hooks/useGetNewReleases";
import { NEW_RELEASES_ITEM_LIMIT } from "@features/albums/model/albumsConstant";
import AlbumCard from "@features/albums/ui/AlbumCard";
import AlbumCardSkeleton from "@features/albums/ui/AlbumSkeleton";

import ErrorMessage from "@shared/ui/ErrorMessage/ErrorMessage";

const NewReleases = (): JSX.Element => {
  const { data, isLoading, isError, error } = useGetNewReleases();
  const albums = data?.albums.items ?? [];

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-bold sm:text-2xl">New Releases</h2>
      {isError && <ErrorMessage message={error.message} />}
      <div className="xl: mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
        {isLoading && <AlbumCardSkeleton length={NEW_RELEASES_ITEM_LIMIT} />}
        {albums.map(album => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </section>
  );
};

export default NewReleases;
