import { useQuery, UseQueryResult } from "@tanstack/react-query";

import getCurrentUserPlaylists from "@features/playlist/api/getCurrentUserPlaylists";
import {
  GetCurrentUserPlaylistsRequest,
  GetCurrentUserPlaylistsResponse,
} from "@features/playlist/model/playlist";

const useGetCurrentUserPlaylists = ({
  limit,
  offset,
}: GetCurrentUserPlaylistsRequest): UseQueryResult<GetCurrentUserPlaylistsResponse> => {
  return useQuery({
    queryKey: ["currentUserPlaylists"],
    queryFn: () => getCurrentUserPlaylists({ limit, offset }),
  });
};

export default useGetCurrentUserPlaylists;
