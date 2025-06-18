import { ApiResponse } from "@shared/model/apiResponse";
import { Album, Artist, Track } from "@shared/model/sharedType";

export type GetSearchForItemParams = {
  q: string;
  type: "track" | "artist" | "album" | "track,artist,album";
  limit?: number;
  offset?: number;
};

export type SearchForItemResponse = {
  tracks?: ApiResponse<Track>;
  artists?: ApiResponse<Artist>;
  albums?: ApiResponse<Album>;
};
