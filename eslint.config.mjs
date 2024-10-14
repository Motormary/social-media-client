import globals from "globals"
import pluginJs from "@eslint/js"

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    ignores: ["node_modules/*", "assets/*"],
  },
  pluginJs.configs.recommended,
]
