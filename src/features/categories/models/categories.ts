export type GetSeveralBrowseCategoriesResponse = {
  categories: {
    href: string;
    limit: number;
    next?: string | null;
    offset: number;
    previous?: string | null;
    total: number;
    items: Category[];
  };
};

export type Category = {
  href: string;
  icons: {
    url: string;
    height?: number | null;
    width?: number | null;
  }[];
  id: string;
  name: string;
};

export type GetSeveralBrowseCategoriesParams = {
  locale?: string;
  limit?: number;
  offset?: number;
};
