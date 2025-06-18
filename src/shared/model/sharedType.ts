export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  popularity: number;
  type: string;
  uri: string;
  name: string;
}

export interface Owner {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

export interface Tracks {
  href?: string;
  total?: number;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: Restrictions;
  type: string;
  uri: string;
  artists: Artist[];
}

export interface Restrictions {
  reason: string;
}

export interface Followers {
  href?: string;
  total?: number;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface ResumePoint {
  fully_played: boolean;
  resume_position_ms: number;
}

export interface Show {
  available_markets: string[];
  copyrights: Copyrights;
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
  total_episodes: number;
}

export interface Copyrights {
  text: string;
  type: string;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}
export interface TrackObject
  extends Omit<Track, "linked_from" | "restrictions" | "preview_url"> {
  linked_from: {};
  restrictions: Restrictions;
  preview_url?: string | null;
  url: string;
}

export interface Track {
  href: string;
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
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
