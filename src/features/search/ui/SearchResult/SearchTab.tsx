import { JSX } from "react";

const SearchTab = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}): JSX.Element => {
  const tabs = [
    { id: "all", label: "전체" },
    { id: "track", label: "곡" },
    { id: "artist", label: "아티스트" },
    { id: "album", label: "앨범" },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex gap-8">
        {tabs.map(tab => (
          <li key={tab.id}>
            <button
              onClick={() => setSelectedTab(tab.id)}
              className={`cursor-pointer border-b-2 px-1 py-4 text-sm font-medium transition-colors duration-200 ${
                selectedTab === tab.id
                  ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTab;
