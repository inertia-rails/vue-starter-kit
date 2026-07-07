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
}).catch((error) => {
  // This ensures this entrypoint is only loaded on Inertia pages
  // by checking for the presence of the root element (#app by default).
  // Feel free to remove this `catch` if you don't need it.
  if (document.getElementById("app")) {
    throw error
  } else {
    console.error(
      "Missing root element.\n\n" +
        "If you see this error, it probably means you loaded Inertia.js on non-Inertia pages.\n" +
        'Consider moving <%= vite_tags "inertia.ts" %> to the Inertia-specific layout instead.',
    )
  }
})

// This will set light / dark mode on page load...
initializeTheme()
