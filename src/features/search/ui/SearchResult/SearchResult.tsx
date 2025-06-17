import { JSX, useState } from "react";

import useGetSearchForItem from "@features/search/hooks/useGetSearchForItem";
import useSearchBar from "@features/search/hooks/useSearchBar";
import SearchResultAlbum from "@features/search/ui/SearchResult/SearchResultAlbum";
import SearchResultArtist from "@features/search/ui/SearchResult/SearchResultArtist";
import SearchResultTrack from "@features/search/ui/SearchResult/SearchResultTrack";
import SearchTab from "@features/search/ui/SearchResult/SearchTab";

const SearchResult = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const { keyword } = useSearchBar();
  const { data: searchResults, isLoading } = useGetSearchForItem({
    q: keyword,
    type: "track,artist,album",
    limit: 5,
  });

  const renderContent = () => {
    switch (selectedTab) {
      case "track":
        return (
          <SearchResultTrack
            tracks={searchResults?.tracks}
            isLoading={isLoading}
          />
        );
      case "artist":
        return (
          <SearchResultArtist
            artists={searchResults?.artists}
            isLoading={isLoading}
          />
        );
      case "album":
        return (
          <SearchResultAlbum
            albums={searchResults?.albums}
            isLoading={isLoading}
          />
        );
      case "all":
      default:
        return (
          <div className="space-y-8">
            <SearchResultTrack
              tracks={searchResults?.tracks}
              isLoading={isLoading}
            />
            <SearchResultArtist
              artists={searchResults?.artists}
              isLoading={isLoading}
            />
            <SearchResultAlbum
              albums={searchResults?.albums}
              isLoading={isLoading}
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <SearchTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {renderContent()}
    </div>
  );
};

export default SearchResult;
