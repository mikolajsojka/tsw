module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "vue/no-side-effects-in-computed-properties":"off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: ["error", 4],
    semi: ["error", "always"],
    quotes: ["error", "double"]
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        indent: "off",
        "vue/script-indent": [
          "error",
          4,
          {
            baseIndent: 1
          }
        ],
        "vue/html-indent": [
          "error",
          4,
          {
            baseIndent: 1
          }
        ],
        "vue/max-attributes-per-line": "off"
      }
    }
  ],
  parserOptions: {
    parser: "babel-eslint"
  }
};
