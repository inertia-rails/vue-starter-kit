import inertia from "@inertiajs/vite"
import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"
import rails from "rails-vite-plugin"
import { defineConfig } from "vite"
import vueDevTools from "vite-plugin-vue-devtools"

export default defineConfig(({ command }) => ({
  ssr: {
    // Prebuild ssr.js so we can drop node_modules from the container.
    noExternal: command === "build" ? true : undefined,
  },
  plugins: [
    vue(),
    vueDevTools({ appendTo: "inertia.ts" }),
    tailwindcss(),
    rails(),
    inertia({ ssr: "app/javascript/entrypoints/inertia.ts" }),
  ],
}))
