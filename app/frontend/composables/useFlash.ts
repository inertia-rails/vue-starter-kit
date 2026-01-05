import { router } from "@inertiajs/vue3"
import { onMounted, onUnmounted } from "vue"
import { toast } from "vue-sonner"

export function useFlash() {
  let removeListener: (() => void) | undefined

  onMounted(() => {
    removeListener = router.on("flash", (event) => {
      const flash = event.detail.flash
      if (flash.alert) {
        toast.error(flash.alert)
      }
      if (flash.notice) {
        toast(flash.notice)
      }
    })
  })

  onUnmounted(() => {
    if (removeListener) {
      removeListener()
    }
  })
}
