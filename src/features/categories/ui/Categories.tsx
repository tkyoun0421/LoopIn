import { JSX } from "react";

import useGetSeveralBrowseCategories from "@features/categories/hooks/useGetSeveralBrowseCategories";
import { assignColorsToCategories } from "@features/categories/lib/assignColorsToCategories";
import CategoriesSkeleton from "@features/categories/ui/CategoriesSkeleton";

const Categories = (): JSX.Element => {
  const { data, isLoading, error } = useGetSeveralBrowseCategories();

  if (isLoading) return <CategoriesSkeleton length={6} />;
  if (error) return <div>Error: {error.message}</div>;

  const categoriesWithColors = data
    ? assignColorsToCategories(data.categories.items)
    : [];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {categoriesWithColors.map(category => (
        <div
          key={category.id}
          className="relative aspect-[3/2] cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
        >
          <img
            src={category.icons[0]?.url}
            alt={category.name}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div
            className={`absolute inset-0 ${category.bgColor} bg-gradient-to-br from-transparent via-current/20 to-current/60`}
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-4">
            <h3 className="line-clamp-2 text-base leading-tight font-bold text-white drop-shadow-lg">
              {category.name}
            </h3>
            <div className="flex items-end justify-end">
              <img
                src={category.icons[0]?.url}
                alt={category.name}
                className="rotate-12 transform rounded-lg object-cover shadow-2xl"
                style={{
                  width: "50%",
                  height: "100%",
                  maxWidth: "none",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Categories;
