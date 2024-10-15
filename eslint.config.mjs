import globals from "globals"
import pluginJs from "@eslint/js"
import jest from "eslint-plugin-jest"

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.test.js"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
    },
  },
  {
    ignores: [
      ".github/*",
      ".husky/*",
      ".node_modules/*",
      ".assets/*",

    ],
  },
  pluginJs.configs.recommended,
]
