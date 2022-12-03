module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'standard', 'prettier', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    "eofline": false,
    "quotemark": [
        true,
        "single"
    ],
    "ordered-imports": [
        false
    ],
    "max-line-length": [
        150
    ],
    "member-ordering": [
        false
    ],
    "curly": false,
    "interface-name": [
        false
    ],
    "array-type": [
        false
    ],
    "no-empty-interface": false,
    "no-empty": false,
    "arrow-parens": false,
    "object-literal-sort-keys": false,
    "no-unused-expression": false,
    "max-classes-per-file": [
        false
    ],
    "variable-name": [
        false
    ],
    "one-line": [
        false
    ],
    "one-variable-per-declaration": [
        false
    ],
    "trailing-comma": [
        false
    ],
    "member-access": [
        false
    ],
    "no-console": [
        false
    ],
    "no-var-requires": false,
    "prettier/prettier": ['error'],
  },
};
