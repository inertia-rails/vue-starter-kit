<script setup lang="ts">
interface Props {
  href: string
  text: string
}

defineProps<Props>()
</script>

<template>
  <span
    class="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]"
  >
    <span class="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
  </span>
  <a
    :href="href"
    target="_blank"
    class="inline-flex items-center space-x-1 font-medium text-[#f53003] underline underline-offset-4 dark:text-[#FF4433]"
    rel="noreferrer"
  >
    <span>{{ text }}</span>
    <svg width="10" height="11" viewBox="0 0 10 11" class="h-2.5 w-2.5">
      <path
        d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
        stroke="currentColor"
        stroke-linecap="square"
      />
    </svg>
  </a>
</template>
