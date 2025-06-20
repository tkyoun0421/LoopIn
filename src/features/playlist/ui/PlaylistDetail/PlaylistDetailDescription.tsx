import DOMPurify from "dompurify";
import { JSX } from "react";

import { Playlist } from "@features/playlist/model/playlist";

const PlaylistDetailDescription = ({
  playlist,
}: {
  playlist: Playlist;
}): JSX.Element => {
  const rawHTML = playlist.description;
  const sanitizedHTML = DOMPurify.sanitize(rawHTML ?? "");

  return (
    <>
      <p
        className="lg:text-md mb-6 text-sm [&_a]:text-blue-500 [&_a]:underline [&_a]:hover:text-blue-700"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
    </>
  );
};

export default PlaylistDetailDescription;
