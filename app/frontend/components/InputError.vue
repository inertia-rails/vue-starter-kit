<script setup lang="ts">
defineProps<{
  messages?: string[]
}>()
</script>

<template>
  <div v-if="messages">
    <p class="text-sm text-red-600 dark:text-red-500">
      {{ messages.join(", ") }}
    </p>
  </div>
</template>
