import { JSX, useState } from "react";

import SearchTab from "@features/search/ui/SearchResult/SearchTab";
import AlbumTabContent from "@features/search/ui/SearchResult/TabContent/AlbumTabContent";
import AllTabContent from "@features/search/ui/SearchResult/TabContent/AllTabContent";
import ArtistTabContent from "@features/search/ui/SearchResult/TabContent/ArtistTabContent";
import TrackTabContent from "@features/search/ui/SearchResult/TabContent/TrackTabContent";

const SearchResult = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const renderContent = () => {
    switch (selectedTab) {
      case "track":
        return <TrackTabContent />;
      case "artist":
        return <ArtistTabContent />;
      case "album":
        return <AlbumTabContent />;
      case "all":
      default:
        return <AllTabContent onTabChange={setSelectedTab} />;
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
