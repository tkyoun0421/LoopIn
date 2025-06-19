import { useQuery } from "@tanstack/react-query";
import { UseQueryResult } from "@tanstack/react-query";
import { useParams } from "react-router";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import getPlaylist from "@features/playlist/api/getPlaylist";
import { Playlist } from "@features/playlist/model/playlist";

import { generateQueryKey } from "@shared/tanstack-query/libs/keyFactories";
import { queryKey } from "@shared/tanstack-query/queryKey";

const useGetPlaylist = (): UseQueryResult<Playlist, Error> => {
  const { access_token } = useTokenStore();
  const { id } = useParams();

  return useQuery({
    queryKey: generateQueryKey(queryKey.playlist, id, access_token),
    queryFn: () => getPlaylist(id!),
    enabled: !!id && !!access_token,
  });
};

export default useGetPlaylist;
