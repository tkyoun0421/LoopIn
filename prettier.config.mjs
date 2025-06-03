/** @type {import('prettier').Config} */
export default {
  tailwindStylesheet: "./src/app/styles/global.css",
  tailwindConfig: "./tailwind.config.js",
  plugins: ["prettier-plugin-tailwindcss"],
  semi: true,
  singleQuote: false,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "avoid",
  endOfLine: "lf",
};
