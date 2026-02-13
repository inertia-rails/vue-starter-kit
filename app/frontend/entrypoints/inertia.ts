import { createInertiaApp } from "@inertiajs/vue3"
import type { DefineComponent } from "vue"
import { createApp, h } from "vue"

import { initializeTheme } from "@/composables/useAppearance"
import PersistentLayout from "@/layouts/PersistentLayout.vue"

const appName = import.meta.env.VITE_APP_NAME ?? "Vue Starter Kit"

createInertiaApp({
  // Set default page title
  // see https://inertia-rails.dev/guide/title-and-meta
  //
  title: (title) => (title ? `${title} - ${appName}` : appName),

  // Disable progress bar
  //
  // see https://inertia-rails.dev/guide/progress-indicators
  // progress: false,

  resolve: (name) => {
    const pages = import.meta.glob<DefineComponent>("../pages/**/*.vue", {
      eager: true,
    })
    const page = pages[`../pages/${name}.vue`]
    if (!page) {
      console.error(`Missing Inertia page component: '${name}.vue'`)
    }

    // To use a default layout, import the Layout component
    // and use the following line.
    // see https://inertia-rails.dev/guide/pages#default-layouts
    //
    page.default.layout ??= PersistentLayout

    return page
  },

  setup({ el, App, props, plugin }) {
    // Uncomment the following to enable SSR hydration:
    // if (el.hasChildNodes()) {
    //   createSSRApp({ render: () => h(App, props) })
    //     .use(plugin)
    //     .mount(el)
    //   return
    // }
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },

  defaults: {
    form: {
      forceIndicesArrayFormatInFormData: false,
      withAllErrors: true,
    },
    future: {
      useScriptElementForInitialPage: true,
      useDataInertiaHeadAttribute: true,
      useDialogForErrorModal: true,
      preserveEqualProps: true,
    },
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
        'Consider moving <%= vite_javascript_tag "inertia" %> to the Inertia-specific layout instead.',
    )
  }
})

// This will set light / dark mode on page load...
initializeTheme()
