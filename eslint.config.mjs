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
    files: ["**/*.cy.js"],
    env: { "cypress/globals": true },
    plugins: ["cypress"],
    extends: ["plugin:cypress/recommended"],
    rules: {
      "cypress/no-unnecessary-waiting": "off",
      "no-unused-vars": "off",
    },
  },
  {
    ignores: [
      ".github/*",
      ".husky/*",
      ".node_modules/*",
      ".assets/*",
      ".eslintcache",
    ],
  },
  pluginJs.configs.recommended,
]
