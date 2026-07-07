import skipFormatting from "@vue/eslint-config-prettier/skip-formatting"
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript"
import importPlugin from "eslint-plugin-import"
import pluginVue from "eslint-plugin-vue"

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["app/javascript/**/*.{ts,mts,tsx,vue}"],
  },
  { ignores: ["app/javascript/components/ui/**", "app/javascript/routes/**"] },

  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
  {
    ...importPlugin.flatConfigs.recommended,
    ...importPlugin.flatConfigs.typescript,
    settings: { "import/resolver": { typescript: {} } },
    rules: {
      "vue/multi-word-component-names": "off",
      "import/order": [
        "error",
        {
          pathGroups: [
            {
              pattern: "@/**",
              group: "external",
              position: "after",
            },
          ],
          "newlines-between": "always",
          named: true,
          alphabetize: { order: "asc" },
        },
      ],
      "import/first": "error",
      "import/extensions": [
        "error",
        "always",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
          mts: "never",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  skipFormatting,
)
