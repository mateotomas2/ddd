module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "no-console": ["error"],
    "comma-dangle": ["off", "never"],
    semi: ["off"],
    //quotes: ['off', 'double'],
    "no-useless-constructor": ["off"],
  },
};
