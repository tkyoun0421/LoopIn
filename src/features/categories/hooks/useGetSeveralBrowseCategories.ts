import { useQuery, UseQueryResult } from "@tanstack/react-query";

import getSeveralBrowseCategories from "@features/categories/api/getSeveralBrowseCategories";
import {
  GetSeveralBrowseCategoriesParams,
  GetSeveralBrowseCategoriesResponse,
} from "@features/categories/models/categories";

import { LONG_CACHE_CONFIG } from "@shared/configs/cacheConfig";

const useGetSeveralBrowseCategories = (
  params: GetSeveralBrowseCategoriesParams = {
    limit: 30,
    offset: 0,
  },
): UseQueryResult<GetSeveralBrowseCategoriesResponse, Error> => {
  return useQuery({
    queryKey: ["browse-categories", params],
    queryFn: () => {
      return getSeveralBrowseCategories(params);
    },
    ...LONG_CACHE_CONFIG,
  });
};

export default useGetSeveralBrowseCategories;
