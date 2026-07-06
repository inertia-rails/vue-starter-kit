<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner"
import { useFlash } from "@/composables/useFlash"
import "vue-sonner/style.css"

useFlash()
</script>

<template>
  <slot />
  <Toaster richColors position="bottom-right" />
</template>
