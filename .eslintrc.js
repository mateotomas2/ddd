module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "no-console": ["error"],
    "comma-dangle": ["off", "never"],
    semi: ["off"],
    quotes: ["error", "double"],
    "no-useless-constructor": ["off"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
