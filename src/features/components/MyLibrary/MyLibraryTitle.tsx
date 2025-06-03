import { BookMarked } from "lucide-react";
import { JSX } from "react";

const MyLibraryTitle = (): JSX.Element => {
  return (
    <div className="flex gap-1.5">
      <BookMarked />
      <h3>My Library</h3>
    </div>
  );
};

export default MyLibraryTitle;
