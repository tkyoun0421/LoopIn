import { useQuery } from "@tanstack/react-query";
import { UseQueryResult } from "@tanstack/react-query";
import { useParams } from "react-router";

import getPlaylist from "@features/playlist/api/getPlaylist";
import { Playlist } from "@features/playlist/model/playlist";

const useGetPlaylist = (): UseQueryResult<Playlist> => {
  const { id } = useParams();
  return useQuery({
    queryKey: ["playlist", id],
    queryFn: () => {
      if (!id) throw new Error("id is required");
      return getPlaylist(id);
    },
    enabled: !!id,
  });
};
export default useGetPlaylist;
