<script setup lang="ts">
import { Link } from "@inertiajs/vue3"

import AppLogoIcon from "@/components/AppLogoIcon.vue"
import { rootPath } from "@/routes"

defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div
    class="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div
      class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r"
    >
      <div class="absolute inset-0 bg-zinc-900" />
      <Link
        :href="rootPath()"
        class="relative z-20 flex items-center text-lg font-medium"
      >
        <AppLogoIcon class="mr-2 size-8 fill-current text-white" />
        Vue Starter Kit
      </Link>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;The One Person Framework. A toolkit so powerful that it
            allows a single individual to create modern applications upon which
            they might build a competitive business.&rdquo;
          </p>
          <footer class="text-sm text-neutral-300">DHH</footer>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div
        class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
      >
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-xl font-medium tracking-tight" v-if="title">
            {{ title }}
          </h1>
          <p class="text-muted-foreground text-sm" v-if="description">
            {{ description }}
          </p>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
