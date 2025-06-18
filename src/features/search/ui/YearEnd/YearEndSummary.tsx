import { JSX } from "react";

import YearEndCard from "@features/search/ui/YearEnd/YearEndCard";
import YearEndSection from "@features/search/ui/YearEnd/YearEndSection";

import { Album, Artist, Track } from "@shared/model/sharedType";

const YearEndSummary = (): JSX.Element => {
  return (
    <section className="mt-6 flex flex-col gap-12">
      <div className="text-left">
        <h2 className="text-hsl(var(--foreground)) text-4xl font-bold">
          2024 올해의 음악 정리
        </h2>
        <p className="mt-2 text-lg text-[hsl(var(--muted-foreground))]">
          올해 가장 사랑받은 음악들을 만나보세요
        </p>
      </div>

      <YearEndSection<Album>
        title="올해의 음반"
        errorMessage="음반 검색 중 오류가 발생했습니다."
        dataKey="albums"
        renderCard={(album, key) => (
          <YearEndCard key={key} item={album} type="album" />
        )}
      />

      <YearEndSection<Track>
        title="올해의 노래"
        errorMessage="노래 검색 중 오류가 발생했습니다."
        dataKey="tracks"
        renderCard={(track, key) => (
          <YearEndCard key={key} item={track} type="track" />
        )}
      />

      <YearEndSection<Artist>
        title="올해의 음악인"
        errorMessage="음악인 검색 중 오류가 발생했습니다."
        dataKey="artists"
        renderCard={(artist, key) => (
          <YearEndCard key={key} item={artist} type="artist" />
        )}
      />

      <YearEndSection<Artist>
        title="올해의 신인"
        errorMessage="신인 검색 중 오류가 발생했습니다."
        dataKey="rookies"
        renderCard={(rookie, key) => (
          <YearEndCard key={key} item={rookie} type="rookie" />
        )}
      />
    </section>
  );
};

export default YearEndSummary;
