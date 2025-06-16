import { CARD_COLORS } from "@features/categories/models/categoriesCardColor";

const shuffleArray = <T>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

export const assignColorsToCategories = <T extends { id: string }>(
  categories: T[],
): (T & { bgColor: string })[] => {
  const shuffledColors = shuffleArray(CARD_COLORS);

  return categories.map((category, index) => ({
    ...category,
    bgColor: shuffledColors[index % shuffledColors.length],
  }));
};
