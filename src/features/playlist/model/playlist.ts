import { ApiResponse } from "@shared/model/apiResponse";
import {
  ExternalUrls,
  Followers,
  Image,
  Owner,
  Tracks,
} from "@shared/model/sharedType";

export interface GetCurrentUserPlaylistsRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylist[]>;

export interface SimplifiedPlaylist extends BasePlayList {
  tracks: Tracks;
}

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

export interface PlaylistItem {
  added_at: string;
  added_by: {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: "user";
    uri: string;
  };
  is_local: boolean;
  track: Track;
  video_thumbnail: {
    url: string | null;
  };
}

export interface PlaylistTrack {
  href?: string;
  items: PlaylistItem[];
  limit?: number;
  next?: string;
  offset?: number;
  previous?: string;
  total?: number;
}

export interface Track {
  album: {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: {
      reason: string;
    };
    type: string;
    uri: string;
    artists: Artist[];
  };
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: object;
  restrictions?: {
    reason: string;
  };
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
