import { EpisodeObject, TrackObject } from "@features/playlist/model/playlist";

export const isEpisode = (
  track: TrackObject | EpisodeObject,
): track is EpisodeObject => {
  return "description" in track;
};

export const getTrackImage = (
  track: TrackObject | EpisodeObject,
): string | null => {
  if (isEpisode(track)) {
    return track.images?.[0]?.url || null;
  }
  return track.album?.images?.[0]?.url || null;
};

export const getArtistNames = (track: TrackObject | EpisodeObject): string => {
  if (isEpisode(track)) {
    return track.show?.name || "Unknown Name";
  }
  return (
    track.artists?.map(artist => artist.name).join(", ") || "Unknown Artist"
  );
};

export const getAlbumName = (track: TrackObject | EpisodeObject): string => {
  if (isEpisode(track)) {
    return track.show?.name || "N/A";
  }
  return track.album?.name || "N/A";
};
