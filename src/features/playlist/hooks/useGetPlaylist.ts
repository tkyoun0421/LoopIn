import { useQuery } from "@tanstack/react-query";
import { UseQueryResult } from "@tanstack/react-query";
import { useParams } from "react-router";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import getPlaylist from "@features/playlist/api/getPlaylist";
import { Playlist } from "@features/playlist/model/playlist";

const useGetPlaylist = (): UseQueryResult<Playlist, Error> => {
  const { access_token } = useTokenStore();
  const { id } = useParams();

  return useQuery<Playlist, Error>({
    queryKey: ["playlist", id, access_token],
    queryFn: () => {
      if (!id) throw new Error("Playlist ID is required");
      if (!access_token) throw new Error("Access token is required");
      return getPlaylist(id);
    },
    enabled: !!id,
    retry: false,
  });
};

export default useGetPlaylist;
