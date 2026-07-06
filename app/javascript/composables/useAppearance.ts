import { onMounted, ref } from "vue"

type Appearance = "light" | "dark" | "system"

const prefersDark = () => {
  if (typeof window === "undefined") {
    return false
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

const applyTheme = (appearance: Appearance) => {
  const isDark =
    appearance === "dark" || (appearance === "system" && prefersDark())

  document.documentElement.classList.toggle("dark", isDark)
}

const mediaQuery = () => {
  if (typeof window === "undefined") {
    return null
  }

  return window.matchMedia("(prefers-color-scheme: dark)")
}

const handleSystemThemeChange = () => {
  const currentAppearance = localStorage.getItem("appearance") as Appearance
  applyTheme(currentAppearance ?? "system")
}

export function initializeTheme() {
  const savedAppearance =
    (localStorage.getItem("appearance") as Appearance) || "system"

  applyTheme(savedAppearance)

  mediaQuery()?.addEventListener("change", handleSystemThemeChange)
}

const appearance = ref<Appearance>("system")

export function useAppearance() {
  onMounted(() => {
    const savedAppearance = localStorage.getItem(
      "appearance",
    ) as Appearance | null

    if (savedAppearance) {
      appearance.value = savedAppearance
    }
  })

  function updateAppearance(value: Appearance) {
    appearance.value = value

    if (value === "system") {
      localStorage.removeItem("appearance")
    } else {
      localStorage.setItem("appearance", value)
    }
    applyTheme(value)
  }

  return {
    appearance,
    updateAppearance,
  }
}
