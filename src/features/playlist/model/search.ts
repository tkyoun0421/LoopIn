import {
  Audiobook,
  Playlist,
  SimplifiedEpisode,
  Track,
} from "@features/playlist/model/playlist";

import { ApiResponse } from "@shared/model/apiResponse";
import { Album, Artist, Show } from "@shared/model/sharedType";

export enum SEARCH_TYPE {
  TRACK = "track",
  ALBUM = "album",
  PLAYLIST = "playlist",
  ARTIST = "artist",
  SHOW = "show",
  EPISODE = "episode",
  AUDIOBOOK = "audiobook",
}

export type SearchRequestParams = {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
};

export type SearchResponse = {
  artists?: ApiResponse<Artist>;
  albums?: ApiResponse<Album>;
  playlists?: ApiResponse<Playlist>;
  tracks?: ApiResponse<Track>;
  shows?: ApiResponse<Show>;
  episodes?: ApiResponse<SimplifiedEpisode>;
  audiobooks?: ApiResponse<Audiobook>;
};
