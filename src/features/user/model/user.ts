export interface SpotifyImage {
  url: string;
  height?: number | null;
  width?: number | null;
}

export interface ExplicitContentSettings {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface CurrentUserProfileResponse {
  country: string;
  display_name: string | null;
  email: string | null;
  explicit_content: ExplicitContentSettings;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: SpotifyImage[];
  product: "premium" | "free" | "open" | string;
  type: "user";
  uri: string;
}
