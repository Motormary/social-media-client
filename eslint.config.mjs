import globals from "globals"
import pluginJs from "@eslint/js"
import jest from "eslint-plugin-jest"
import pluginCypress from 'eslint-plugin-cypress/flat'

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
      "cypress/no-unnecessary-waiting": "off",
	        "no-unused-vars": "off"
    },
  },
  {
    plugins: {
      cypress: pluginCypress,
    },
    files: ["cypress/e2e/3-testing/*.cy.js"],
    rules: {
      ...pluginCypress.rules,
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
      ".husky/",
    ],
  },
  pluginJs.configs.recommended,
]
