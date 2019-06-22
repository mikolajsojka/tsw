module.exports = {
  extends: "airbnb-base",
  env: {
    es6: true,
    browser: true
  },
  rules: {
    "brace-style": ["error", "stroustrup"],
    "comma-dangle": ["error", "never"],
    "no-unused-vars": ["warn"],
    "no-var": ["off"],
    "one-var": ["off"],
    "array-bracket-newline": [
      "error",
      {
        multiline: true
      }
    ],
    "linebreak-style": ["error", "windows"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: ["error", 4],
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "import/order": "off",
    "no-multi-assign": "off",
    "no-param-reassign": "off",
    "consistent-return": "off",
    "no-shadow": "off",
    "import/no-unresolved": "off",
    "prefer-const": "off",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "no-underscore-dangle":"off",
    "radix":"off",
    "max-len":"off",
    "no-undef":"off",
    "no-alert":"off",
    "prefer-destructuring":"off",
    "no-empty":"off",
    "no-restricted-globals":"off"
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  plugins: ["html"]
};
