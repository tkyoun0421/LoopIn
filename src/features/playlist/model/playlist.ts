import { ApiResponse } from "@shared/model/apiResponse";
import {
  Copyrights,
  EpisodeObject,
  ExternalUrls,
  Followers,
  Image,
  Owner,
  Track,
  Tracks,
} from "@shared/model/sharedType";

export type GetCurrentUserPlaylistsRequest = {
  limit?: number;
  offset?: number;
};

export type GetCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylist[]>;

export type SimplifiedPlaylist = BasePlayList & {
  tracks: Tracks;
};

export interface BasePlayList {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  type: "playlist";
  uri: string;
}

export interface Playlist extends BasePlayList {
  tracks: PlaylistTrack;
  followers: Followers;
}

export type PlaylistItem = {
  added_at: string;
  added_by: {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: "user";
    uri: string;
  };
  is_local: boolean;
  track: Track | EpisodeObject;
  video_thumbnail: {
    url: string | null;
  };
};

export type PlaylistTrack = {
  href: string;
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total?: number;
  items: PlaylistItem[];
};

export type GetPlaylistItemsResponse = ApiResponse<PlaylistItem>;

export type PlaylistFormData = {
  name: string;
  description?: string;
  public: boolean;
  collaborative?: boolean;
};

export type PlaylistFormErrors = Partial<
  Record<keyof PlaylistFormData, string>
>;

export type SimplifiedEpisode = Omit<EpisodeObject, "show">;

export type Audiobook = {
  authors: { name: string }[];
  available_markets: string[];
  copyrights: Copyrights;
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: { name: string }[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
};
