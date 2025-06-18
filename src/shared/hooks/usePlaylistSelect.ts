import { useCallback, useRef, useEffect, useState } from "react";

import useGetCurrentUserPlaylists from "@features/playlist/hooks/useGetCurrentUserPlaylists";
import { SimplifiedPlaylist } from "@features/playlist/model/playlist";

import useIntersectionObserver from "@shared/hooks/useIntersectionObserver";

const usePlaylistSelect = (isModalOpen: boolean = false): UsePlaylistSelect => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [containerReady, setContainerReady] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetCurrentUserPlaylists({
      limit: 20,
    });

  const allPlaylists = data?.pages?.flatMap(page => page.items).flat() ?? [];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    } else if (!hasNextPage) {
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (isModalOpen && scrollContainerRef.current) {
      setContainerReady(true);
    } else {
      setContainerReady(false);
    }
  }, [isModalOpen]);

  const { targetRef: scrollRef } = useIntersectionObserver({
    root: containerReady ? scrollContainerRef.current : null,
    rootMargin: "50px",
    threshold: 0.1,
    onIntersect: containerReady ? handleLoadMore : undefined,
  });

  return {
    playlists: allPlaylists,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    scrollContainerRef,
    scrollRef,
  };
};

export default usePlaylistSelect;
type UsePlaylistSelect = {
  playlists: SimplifiedPlaylist[];
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
};
