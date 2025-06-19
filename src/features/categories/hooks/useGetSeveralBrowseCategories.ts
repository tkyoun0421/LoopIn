import { useQuery, UseQueryResult } from "@tanstack/react-query";

import getSeveralBrowseCategories from "@features/categories/api/getSeveralBrowseCategories";
import {
  GetSeveralBrowseCategoriesParams,
  GetSeveralBrowseCategoriesResponse,
} from "@features/categories/models/categories";

import { LONG_CACHE_CONFIG } from "@shared/configs/cacheConfig";
import { generateQueryKey } from "@shared/tanstack-query/libs/keyFactories";
import { queryKey } from "@shared/tanstack-query/queryKey";

const useGetSeveralBrowseCategories = (
  params: GetSeveralBrowseCategoriesParams,
): UseQueryResult<GetSeveralBrowseCategoriesResponse, Error> => {
  return useQuery({
    queryKey: generateQueryKey(queryKey.browseCategories, params),
    queryFn: () => getSeveralBrowseCategories(params),
    ...LONG_CACHE_CONFIG,
  });
};

export default useGetSeveralBrowseCategories;
