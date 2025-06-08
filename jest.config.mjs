import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig";

export const preset = "ts-jest";
export const testEnvironment = "jsdom";
export const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: "<rootDir>/src/",
});
