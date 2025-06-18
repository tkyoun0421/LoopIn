import { useQuery, UseQueryResult } from "@tanstack/react-query";

import useClientAuthStore from "@features/auth/store/useClientAuthStore";
import getSearchForItem from "@features/search/api/getSearchForItem";
import {
  GetSearchForItemParams,
  SearchForItemResponse,
} from "@features/search/models/search";

import { LONG_CACHE_CONFIG } from "@shared/configs/cacheConfig";

const useGetSearchForItem = (
  params: GetSearchForItemParams,
): UseQueryResult<SearchForItemResponse, Error> => {
  const { clientAuthToken } = useClientAuthStore();
  const hasValidQuery = !!params.q?.trim();

  return useQuery({
    queryKey: ["searchForItem", params],
    queryFn: () => {
      if (!clientAuthToken) {
        throw new Error("토큰을 사용할 수 없습니다.");
      }
      return getSearchForItem(clientAuthToken, params);
    },
    enabled: !!clientAuthToken && hasValidQuery,
    ...LONG_CACHE_CONFIG,
  });
};

export default useGetSearchForItem;
