import { EpisodeObject, Track } from "@shared/model/sharedType";

export const isEpisode = (
  track: Track | EpisodeObject,
): track is EpisodeObject => {
  return "description" in track;
};

export const getTrackImage = (track: Track | EpisodeObject): string | null => {
  if (isEpisode(track)) {
    return track.images?.[0]?.url || null;
  }
  return track.album?.images?.[0]?.url || null;
};

export const getArtistNames = (track: Track | EpisodeObject): string => {
  if (isEpisode(track)) {
    return track.show?.name || "Unknown Name";
  }
  return (
    track.artists?.map(artist => artist.name).join(", ") || "Unknown Artist"
  );
};

export const getAlbumName = (track: Track | EpisodeObject): string => {
  if (isEpisode(track)) {
    return track.show?.name || "N/A";
  }
  return track.album?.name || "N/A";
};
