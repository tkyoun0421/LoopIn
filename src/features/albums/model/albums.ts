import { Artist, ExternalUrls, Image } from "@shared/model/sharedType";

export interface AlbumsResponse {
  albums: Albums;
}

export interface Albums {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Album[];
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
