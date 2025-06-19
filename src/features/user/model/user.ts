export type SpotifyImage = {
  url: string;
  height?: number | null;
  width?: number | null;
};

export type ExplicitContentSettings = {
  filter_enabled: boolean;
  filter_locked: boolean;
};

export type ExternalUrls = {
  spotify: string;
};

export type Followers = {
  href: string | null;
  total: number;
};

export type CurrentUserProfileResponse = {
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
};
