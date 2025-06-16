import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import getSeveralBrowseCategories from "@features/categories/api/getSeveralBrowseCategories";
import {
  GetSeveralBrowseCategoriesParams,
  GetSeveralBrowseCategoriesResponse,
} from "@features/categories/models/categories";

const useGetSeveralBrowseCategories = (
  params: GetSeveralBrowseCategoriesParams = {
    limit: 30,
    offset: 0,
  },
): UseQueryResult<GetSeveralBrowseCategoriesResponse, Error> => {
  const { access_token } = useTokenStore();

  if (!access_token) {
    throw new Error("Access token is required");
  }

  return useQuery({
    queryKey: ["browse-categories", params],
    queryFn: () => getSeveralBrowseCategories(access_token, params),
  });
};

export default useGetSeveralBrowseCategories;
