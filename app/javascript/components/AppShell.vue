<script setup lang="ts">
import { ref, watch } from "vue"

import { SidebarProvider } from "@/components/ui/sidebar"
import * as storage from "@/lib/storage"

interface Props {
  variant?: "header" | "sidebar"
}

defineProps<Props>()

const isOpen = ref(storage.getItem("sidebar") !== "false")

watch(isOpen, (open) => {
  storage.setItem("sidebar", String(open))
})
</script>

<template>
  <div v-if="variant === 'header'" class="flex min-h-screen w-full flex-col">
    <slot />
  </div>
  <SidebarProvider v-else :default-open="isOpen" v-model:open="isOpen">
    <slot />
  </SidebarProvider>
</template>
