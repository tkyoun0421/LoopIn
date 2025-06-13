import { ApiResponse } from "@shared/model/apiResponse";
import {
  Album,
  Artist,
  Copyrights,
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
  track: TrackObject | EpisodeObject;
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
