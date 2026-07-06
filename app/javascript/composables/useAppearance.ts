import { onMounted, ref } from "vue"

import { isBrowser } from "@/lib/browser"
import * as storage from "@/lib/storage"

type Appearance = "light" | "dark" | "system"

const prefersDark = () => {
  if (!isBrowser) {
    return false
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

const applyTheme = (appearance: Appearance) => {
  if (!isBrowser) return

  const isDark =
    appearance === "dark" || (appearance === "system" && prefersDark())

  document.documentElement.classList.toggle("dark", isDark)
}

const mediaQuery = () => {
  if (!isBrowser) {
    return null
  }

  return window.matchMedia("(prefers-color-scheme: dark)")
}

const handleSystemThemeChange = () => {
  const currentAppearance = storage.getItem("appearance") as Appearance
  applyTheme(currentAppearance ?? "system")
}

export function initializeTheme() {
  const savedAppearance =
    (storage.getItem("appearance") as Appearance) || "system"

  applyTheme(savedAppearance)

  mediaQuery()?.addEventListener("change", handleSystemThemeChange)
}

const appearance = ref<Appearance>("system")

export function useAppearance() {
  onMounted(() => {
    const savedAppearance = storage.getItem("appearance") as Appearance | null

    if (savedAppearance) {
      appearance.value = savedAppearance
    }
  })

  function updateAppearance(value: Appearance) {
    appearance.value = value

    if (value === "system") {
      storage.removeItem("appearance")
    } else {
      storage.setItem("appearance", value)
    }
    applyTheme(value)
  }

  return {
    appearance,
    updateAppearance,
  }
}
