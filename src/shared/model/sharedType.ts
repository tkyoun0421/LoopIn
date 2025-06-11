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
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
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

export interface Restrictions {
  reason: string;
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

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
