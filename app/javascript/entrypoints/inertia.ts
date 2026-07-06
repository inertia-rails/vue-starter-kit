import { createInertiaApp } from "@inertiajs/vue3"

import { initializeTheme } from "@/composables/useAppearance"
import PersistentLayout from "@/layouts/PersistentLayout.vue"

const appName = import.meta.env.VITE_APP_NAME ?? "Vue Starter Kit"

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  pages: "../pages",
  layout: () => PersistentLayout,
  defaults: {
    form: {
      forceIndicesArrayFormatInFormData: false,
      withAllErrors: true,
    },
    visitOptions: () => ({
      queryStringArrayFormat: "brackets",
    }),
  },
  progress: {
    color: "#4B5563",
  },
})

// This will set light / dark mode on page load...
initializeTheme()
