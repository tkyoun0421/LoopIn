import { ApiResponse } from "@shared/model/apiResponse";
import { Album } from "@shared/model/sharedType";

export interface GetNewReleasesResponse {
  albums: ApiResponse<Album>;
}
