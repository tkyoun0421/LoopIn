import { ApiResponse } from "@shared/model/apiResponse";
import {
  Album,
  Artist,
  ExternalIds,
  ExternalUrls,
  Followers,
  Image,
  Owner,
  Restrictions,
  ResumePoint,
  Show,
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
  href: string;
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total?: number;
  items: PlaylistItem[];
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: object;
  restrictions?: Restrictions;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface TrackObject
  extends Omit<Track, "linked_from" | "uri" | "restrictions" | "preview_url"> {
  linked_from: {};
  restrictions: Restrictions;
  preview_url?: string | null;
  url: string;
}

export interface EpisodeObject
  extends Pick<
    Track,
    | "external_urls"
    | "href"
    | "id"
    | "name"
    | "type"
    | "explicit"
    | "is_playable"
    | "duration_ms"
  > {
  audio_preview_url?: string | null;
  description: string;
  html_description: string;
  images: Image[];
  is_externally_hosted: boolean;
  language: string;
  languages: string[];
  release_date: string;
  release_date_precision: string;
  resume_point: ResumePoint;
  restrictions: Restrictions;
  show: Show;
}
