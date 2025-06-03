export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "refactor", "test", "chore"],
    ],
    "header-max-length": [2, "always", 50],
    "subject-case": [2, "always", "sentence-case"],
    "subject-full-stop": [2, "never", "."],
  },
};