// Complexity gate only (docs/quality/baselines.md): no function over cyclomatic complexity 10.
module.exports = [
  {
    files: ["assets/js/**/*.js", "tests/**/*.js", "*.config.js"],
    languageOptions: { ecmaVersion: 2022, sourceType: "script" },
    rules: { complexity: ["error", 10] },
  },
];
