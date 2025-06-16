import { JSX } from "react";

import useGetSeveralBrowseCategories from "@features/categories/hooks/useGetSeveralBrowseCategories";
import { assignColorsToCategories } from "@features/categories/lib/assignColorsToCategories";
import CategoriesSkeleton from "@features/categories/ui/CategoriesSkeleton";

const Categories = (): JSX.Element => {
  const { data, isLoading, error } = useGetSeveralBrowseCategories();

  if (isLoading) return <CategoriesSkeleton length={12} />;
  if (error) return <div>Error: {error.message}</div>;

  const categoriesWithColors = data
    ? assignColorsToCategories(data.categories.items)
    : [];

  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
      {categoriesWithColors.map(category => (
        <div
          key={category.id}
          className="relative aspect-[3/2] cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
        >
          <div className="bg-opacity-20 absolute inset-0 bg-black" />
          <div
            className={`relative z-10 flex h-full flex-col justify-between p-4 ${category.bgColor}`}
          >
            <h3 className="line-clamp-2 text-base leading-tight font-bold text-white">
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
