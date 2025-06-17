import { useQuery, UseQueryResult } from "@tanstack/react-query";

import useGetClientAuthToken from "@features/auth/hooks/useClientAuthToken";
import getSearchForItem from "@features/search/api/getSearchForItem";
import {
  GetSearchForItemParams,
  SearchForItemResponse,
} from "@features/search/models/search";

const useGetSearchForItem = (
  params: GetSearchForItemParams,
): UseQueryResult<SearchForItemResponse, Error> => {
  const clientToken = useGetClientAuthToken();
  const hasValidQuery = !!params.q?.trim();

  return useQuery({
    queryKey: ["searchForItem", params],
    queryFn: () => {
      if (!clientToken) {
        throw new Error("토큰을 사용할 수 없습니다.");
      }
      return getSearchForItem(clientToken, params);
    },
    enabled: !!clientToken && hasValidQuery,
  });
};

export default useGetSearchForItem;
