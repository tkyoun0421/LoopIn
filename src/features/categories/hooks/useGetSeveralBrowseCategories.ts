import { useQuery, UseQueryResult } from "@tanstack/react-query";

import useGetClientAuthToken from "@features/auth/hooks/useClientAuthToken";
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
  const clientAuthToken = useGetClientAuthToken();

  return useQuery({
    queryKey: ["browse-categories", params],
    queryFn: () => {
      if (!clientAuthToken) {
        throw new Error("fail to fetch client auth token.");
      }
      return getSeveralBrowseCategories(clientAuthToken, params);
    },
    enabled: !!clientAuthToken,
  });
};

export default useGetSeveralBrowseCategories;
