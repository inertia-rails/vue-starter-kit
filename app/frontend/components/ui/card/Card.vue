<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-lg border border-border/60 py-6 shadow-sm transition-shadow duration-200 hover:shadow-md',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
