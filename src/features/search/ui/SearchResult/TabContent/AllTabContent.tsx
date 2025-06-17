import { JSX } from "react";

import useGetSearchForItem from "@features/search/hooks/useGetSearchForItem";
import useSearchBar from "@features/search/hooks/useSearchBar";
import SearchResultAlbum from "@features/search/ui/SearchResult/SearchResultAlbum";
import SearchResultArtist from "@features/search/ui/SearchResult/SearchResultArtist";
import SearchResultSkeleton from "@features/search/ui/SearchResult/SearchResultSkeleton";
import SearchResultTrack from "@features/search/ui/SearchResult/SearchResultTrack";

const ALL_TAB_LIMIT = 5;

interface AllTabContentProps {
  onTabChange: (tab: string) => void;
}

const AllTabContent = ({ onTabChange }: AllTabContentProps): JSX.Element => {
  const { keyword } = useSearchBar();

  const { data: allTrackResults, isLoading: isAllTrackLoading } =
    useGetSearchForItem({
      q: keyword,
      type: "track",
      limit: ALL_TAB_LIMIT,
      offset: 0,
    });

  const { data: allArtistResults, isLoading: isAllArtistLoading } =
    useGetSearchForItem({
      q: keyword,
      type: "artist",
      limit: ALL_TAB_LIMIT,
      offset: 0,
    });

  const { data: allAlbumResults, isLoading: isAllAlbumLoading } =
    useGetSearchForItem({
      q: keyword,
      type: "album",
      limit: ALL_TAB_LIMIT,
      offset: 0,
    });

  const isAnyLoading =
    isAllTrackLoading || isAllArtistLoading || isAllAlbumLoading;

  if (isAnyLoading) {
    return <SearchResultSkeleton type="all" count={ALL_TAB_LIMIT} />;
  }

  const limitedTrackData = allTrackResults?.tracks
    ? {
        ...allTrackResults.tracks,
        items: allTrackResults.tracks.items.slice(0, ALL_TAB_LIMIT),
      }
    : undefined;

  const limitedArtistData = allArtistResults?.artists
    ? {
        ...allArtistResults.artists,
        items: allArtistResults.artists.items.slice(0, ALL_TAB_LIMIT),
      }
    : undefined;

  const limitedAlbumData = allAlbumResults?.albums
    ? {
        ...allAlbumResults.albums,
        items: allAlbumResults.albums.items.slice(0, ALL_TAB_LIMIT),
      }
    : undefined;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">곡</h3>
          {allTrackResults?.tracks &&
            allTrackResults.tracks.total > ALL_TAB_LIMIT && (
              <button
                onClick={() => onTabChange("track")}
                className="cursor-pointer text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
              >
                모두 보기
              </button>
            )}
        </div>
        <SearchResultTrack tracks={limitedTrackData} isLoading={false} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">아티스트</h3>
          {allArtistResults?.artists &&
            allArtistResults.artists.total > ALL_TAB_LIMIT && (
              <button
                onClick={() => onTabChange("artist")}
                className="cursor-pointer text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
              >
                모두 보기
              </button>
            )}
        </div>
        <SearchResultArtist artists={limitedArtistData} isLoading={false} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">앨범</h3>
          {allAlbumResults?.albums &&
            allAlbumResults.albums.total > ALL_TAB_LIMIT && (
              <button
                onClick={() => onTabChange("album")}
                className="cursor-pointer text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
              >
                모두 보기
              </button>
            )}
        </div>
        <SearchResultAlbum albums={limitedAlbumData} isLoading={false} />
      </div>
    </div>
  );
};

export default AllTabContent;
