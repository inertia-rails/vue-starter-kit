import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import RubyPlugin from "vite-plugin-ruby"
import vueDevTools from "vite-plugin-vue-devtools"

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools({
      appendTo: "inertia.ts",
    }),
    tailwindcss(),
    RubyPlugin(),
  ],
})
