/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  files: ["**/*.{js,ts,jsx,tsx}"],
  ignores: ["dist/**", "build/**", "node_modules/**"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
  },
  plugins: {
    "@typescript-eslint": tsPlugin,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "jsx-a11y",
    "import",
    "boundaries",
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
    "boundaries/elements": [
      { type: "app", pattern: "@app/*" },
      { type: "pages", pattern: "@pages/*" },
      { type: "widgets", pattern: "@widgets/*" },
      { type: "features", pattern: "@features/*" },
      { type: "entities", pattern: "@entities/*" },
      { type: "shared", pattern: "@shared/*" },
    ],
  },
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          { pattern: "@app/**", group: "internal", position: "before" },
          { pattern: "@pages/**", group: "internal", position: "before" },
          { pattern: "@widgets/**", group: "internal", position: "before" },
          { pattern: "@features/**", group: "internal", position: "before" },
          { pattern: "@entities/**", group: "internal", position: "before" },
          { pattern: "@shared/**", group: "internal", position: "before" },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
      },
    ],
    "boundaries/element-types": [
      "warn",
      {
        default: "disallow",
        rules: [
          {
            from: "app",
            allow: [
              "shared",
              "entities",
              "features",
              "widgets",
              "pages",
              "app",
            ],
          },
          {
            from: "pages",
            allow: ["shared", "entities", "features", "widgets"],
          },
          {
            from: "widgets",
            allow: ["shared", "entities", "features"],
          },
          {
            from: "features",
            allow: ["shared", "entities"],
          },
          {
            from: "entities",
            allow: ["shared"],
          },
          {
            from: "shared",
            allow: ["shared"],
          },
        ],
      },
    ],
  },
};
