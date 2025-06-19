import { useQuery, UseQueryResult } from "@tanstack/react-query";

import useClientAuthStore from "@features/auth/store/useClientAuthStore";
import getSearchForItem from "@features/search/api/getSearchForItem";
import {
  GetSearchForItemParams,
  SearchForItemResponse,
} from "@features/search/models/search";

import { LONG_CACHE_CONFIG } from "@shared/configs/cacheConfig";
import { generateQueryKey } from "@shared/tanstack-query/libs/keyFactories";
import { queryKey } from "@shared/tanstack-query/queryKey";

const useGetSearchForItem = (
  params: GetSearchForItemParams,
): UseQueryResult<SearchForItemResponse, Error> => {
  const { clientAuthToken } = useClientAuthStore();
  const hasValidQuery = !!params.q?.trim();

  return useQuery({
    queryKey: generateQueryKey(queryKey.searchForItem, params),
    queryFn: () => getSearchForItem(params),
    enabled: !!clientAuthToken && hasValidQuery,
    ...LONG_CACHE_CONFIG,
  });
};

export default useGetSearchForItem;
