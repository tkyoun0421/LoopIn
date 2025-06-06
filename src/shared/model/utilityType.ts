export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type NullablePick<T, K extends keyof T> = {
  [P in K]: T[P] | null;
};
