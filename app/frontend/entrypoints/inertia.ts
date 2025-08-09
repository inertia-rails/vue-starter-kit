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
  progress: {
    color: "#4B5563",
  },
})

// This will set light / dark mode on page load...
initializeTheme()
