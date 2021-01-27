// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
module.exports = {
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:jest/recommended",
    "prettier",
    "prettier/prettier",
    "prettier/standard",
    "plugin:node/recommended",
  ],
  plugins: ["jest"],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    sourceType: "module",
  },
  env: {
    commonjs: true,
    node: true,
    "jest/globals": true,
  },
  rules: {
    "prefer-destructuring": "off",
    "object-shorthand": "off",
    "arrow-body-style": "off",
    "no-underscore-dangle": "off",
  },
};
