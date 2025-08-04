import { router, usePage } from "@inertiajs/vue3"
import { ref, watch } from "vue"
import { toast } from "vue-sonner"

import type { Flash } from "@/types"

const emptyFlash = {}

export const useFlash = () => {
  const page = usePage()
  const currentFlash = ref<Flash>(emptyFlash)

  router.on("start", () => {
    currentFlash.value = emptyFlash
  })

  watch(
    () => page.props.flash,
    (newFlash) => {
      currentFlash.value = newFlash
    },
    { immediate: true },
  )

  watch(
    currentFlash,
    (flash) => {
      if (flash.alert) {
        toast.error(flash.alert)
      }
      if (flash.notice) {
        toast(flash.notice)
      }
    },
    { deep: true },
  )
}
