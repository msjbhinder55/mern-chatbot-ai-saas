// backend/.eslintrc.cjs
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["airbnb-typescript/base", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    // Your custom rules here
  },
};
