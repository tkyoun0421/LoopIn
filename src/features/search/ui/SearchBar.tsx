import { JSX, useState } from "react";

import SearchInput from "@features/playlist/ui/PlaylistDetail/PlaylistSearch/SearchInput";

const SearchBar = (): JSX.Element => {
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
  };

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Search</h3>
      <div className="flex-shrink-0">
        <SearchInput
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="트랙, 아티스트, 앨범 검색..."
        />
      </div>
    </section>
  );
};

export default SearchBar;
