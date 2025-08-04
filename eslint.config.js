import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import importPlugin from "eslint-plugin-import"

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ["app/frontend/**/*.{ts,mts,tsx,vue}"]
  },
  { ignores: ["app/frontend/routes/*"] },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    ...importPlugin.flatConfigs.recommended,
    ...importPlugin.flatConfigs.typescript,
    rules: {
      'vue/multi-word-component-names': 'off',
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
          "named": true,
          alphabetize: { order: "asc" },
        },
      ],
      "import/first": "error",
      "import/extensions": ["error", "never", { "svg": "always", "png": "always", "jpg": "always", "webp": "always", "vue": "always", "css": "always" }],
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  skipFormatting,
)
