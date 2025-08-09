import { createInertiaApp } from "@inertiajs/vue3"
import createServer from "@inertiajs/vue3/server"
import type { DefineComponent } from "vue"
import { createSSRApp, h } from "vue"
import { renderToString } from "vue/server-renderer"

import PersistentLayout from "@/layouts/PersistentLayout.vue"

const appName = import.meta.env.VITE_APP_NAME ?? "Vue Starter Kit"

createServer(
  (page) =>
    createInertiaApp({
      page,
      render: renderToString,
      title: (title) => (title ? `${title} - ${appName}` : appName),

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
      setup: ({ App, props, plugin }) =>
        createSSRApp({ render: () => h(App, props) }).use(plugin),
    }),
  { cluster: true },
)
