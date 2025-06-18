import { JSX, ReactNode } from "react";

import useGetMultipleSearchItems, {
  SearchItemResult,
} from "@features/search/hooks/useGetMultipleSearchItems";
import YearEndCardSkeleton from "@features/search/ui/YearEnd/YearEndCardSkeleton";

import { Album, Artist, Track } from "@shared/model/sharedType";
import ErrorMessage from "@shared/ui/ErrorMessage/ErrorMessage";

const YearEndSection = <T extends Artist | Track | Album>({
  title,
  errorMessage,
  dataKey,
  renderCard,
}: YearEndSectionProps<T>): JSX.Element => {
  const { results, isAllLoading, hasErrors } = useGetMultipleSearchItems();
  const items = (results[dataKey] ?? []) as SearchItemResult<T>[];

  return (
    <section
      className={`flex flex-col gap-6 ${dataKey === "albums" ? "mt-6" : ""}`}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      {hasErrors && <ErrorMessage message={errorMessage} />}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {isAllLoading && <YearEndCardSkeleton length={5} />}
        {items.map(({ searchQuery, item }) => {
          return item ? renderCard(item, searchQuery) : null;
        })}
      </div>
    </section>
  );
};

export default YearEndSection;

type YearEndSectionProps<T> = {
  title: string;
  errorMessage: string;
  dataKey: "albums" | "tracks" | "artists" | "rookies";
  renderCard: (item: T, key: string) => ReactNode;
};
