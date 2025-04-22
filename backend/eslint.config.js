import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser, // Make sure the TypeScript parser is being used
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "no-console": "off", // Disable 'no-console' rule
      "@typescript-eslint/no-explicit-any": "warn",
    },
    ignores: ["dist/", "node_modules/"],
  },
];
