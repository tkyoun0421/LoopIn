// storageFactory.ts
import { PersistStorage, StorageValue } from "zustand/middleware";

export const createLocalStorageWrapper = <T>(): PersistStorage<T> => ({
  getItem: (name: string): StorageValue<T> | null => {
    try {
      const item = localStorage.getItem(name);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Failed to get item from localStorage: ${name}`, error);
      return null;
    }
  },

  setItem: (name: string, value: StorageValue<T>): void => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set item to localStorage: ${name}`, error);
    }
  },

  removeItem: (name: string): void => {
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.error(`Failed to remove item from localStorage: ${name}`, error);
    }
  },
});

export const createCookieStorageWrapper = <T>(): PersistStorage<T> => ({
  getItem: (name: string): StorageValue<T> | null => {
    try {
      const cookies = document.cookie.split(";");
      const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));

      if (!cookie) return null;

      const value = cookie.split("=")[1];
      return value ? JSON.parse(decodeURIComponent(value)) : null;
    } catch (error) {
      console.error(`Failed to get cookie: ${name}`, error);
      return null;
    }
  },

  setItem: (name: string, value: StorageValue<T>): void => {
    try {
      const encodedValue = encodeURIComponent(JSON.stringify(value));
      const expires = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toUTCString();
      document.cookie = `${name}=${encodedValue}; expires=${expires}; path=/; secure; samesite=strict`;
    } catch (error) {
      console.error(`Failed to set cookie: ${name}`, error);
    }
  },

  removeItem: (name: string): void => {
    try {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } catch (error) {
      console.error(`Failed to remove cookie: ${name}`, error);
    }
  },
});

export const getStorageWrapper = <T>(
  type: "localStorage" | "cookie" = "localStorage",
): PersistStorage<T> => {
  switch (type) {
    case "cookie":
      return createCookieStorageWrapper<T>();
    case "localStorage":
    default:
      return createLocalStorageWrapper<T>();
  }
};
