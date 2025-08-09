<script setup lang="ts">
import { Head, Link } from "@inertiajs/vue3"

import AppLogoIcon from "@/components/AppLogoIcon.vue"
import ResourceItem from "@/components/ResourceItem.vue"
import { dashboardPath, signInPath, signUpPath } from "@/routes"

const links = [
  [
    {
      text: "Inertia Rails Docs",
      href: "https://inertia-rails.dev",
    },
    {
      text: "shadcn/vue Components",
      href: "https://shadcn-vue.com",
    },
    {
      text: "React Docs",
      href: "https://react.dev",
    },
    {
      text: "Rails Guides",
      href: "https://guides.rubyonrails.org",
    },
  ],
]
</script>

<template>
  <Head title="Welcome">
    <link rel="preconnect" href="https://rsms.me/" />
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
  </Head>
  <div
    class="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]"
  >
    <header
      class="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl"
    >
      <nav class="flex items-center justify-end gap-4">
        <Link
          v-if="$page.props.auth.user"
          :href="dashboardPath()"
          class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
        >
          Dashboard
        </Link>
        <template v-else>
          <Link
            :href="signInPath()"
            class="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
          >
            Log in
          </Link>
          <Link
            :href="signUpPath()"
            class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
          >
            Register
          </Link>
        </template>
      </nav>
    </header>
    <div
      class="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0"
    >
      <main
        class="flex w-full max-w-[335px] flex-col-reverse overflow-hidden rounded-lg lg:max-w-4xl lg:flex-row"
      >
        <div
          class="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]"
        >
          <h1 class="mb-1 font-medium">Vue Starter Kit</h1>
          <p class="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
            Rails + Inertia.js + Vue.js + shadcn/vue
            <br />
            Here are some resources to begin:
          </p>

          <ul class="mb-4 flex flex-col lg:mb-6">
            <li
              v-for="(link, index) in links[0]"
              :key="index"
              class="relative flex items-center gap-4 py-2"
            >
              <ResourceItem :text="link.text" :href="link.href" />
            </li>
          </ul>
          <ul class="flex gap-3 text-sm leading-normal">
            <li>
              <a
                href="https://inertia-rails.dev/"
                target="_blank"
                class="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
              >
                Learn more
              </a>
            </li>
          </ul>
        </div>

        <div
          class="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#D30001] p-10 text-white lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg"
        >
          <AppLogoIcon class="h-full w-full" />
        </div>
      </main>
    </div>
  </div>
</template>
