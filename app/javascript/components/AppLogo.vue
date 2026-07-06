<script setup lang="ts">
import AppLogoIcon from "@/components/AppLogoIcon.vue"

const appName = import.meta.env.VITE_APP_NAME ?? "Vue Starter Kit"
</script>

<template>
  <div
    class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md"
  >
    <AppLogoIcon class="size-5 fill-current text-white" />
  </div>
  <div class="ml-1 grid flex-1 text-left text-sm">
    <span class="mb-0.5 truncate leading-tight font-semibold">
      {{ appName }}
    </span>
  </div>
</template>
