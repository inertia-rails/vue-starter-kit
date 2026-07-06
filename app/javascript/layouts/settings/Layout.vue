<script setup lang="ts">
import { Link, usePage } from "@inertiajs/vue3"

import Heading from "@/components/Heading.vue"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  settingsAppearance,
  settingsEmails,
  settingsPasswords,
  settingsProfiles,
  settingsSessions,
} from "@/routes"
import { type NavItem } from "@/types"

const sidebarNavItems: NavItem[] = [
  {
    title: "Profile",
    href: settingsProfiles.show().url,
  },
  {
    title: "Email",
    href: settingsEmails.show().url,
  },
  {
    title: "Password",
    href: settingsPasswords.show().url,
  },
  {
    title: "Sessions",
    href: settingsSessions.index().url,
  },
  {
    title: "Appearance",
    href: settingsAppearance().url,
  },
]

const page = usePage()
</script>

<template>
  <div class="px-4 py-6">
    <Heading
      title="Settings"
      description="Manage your profile and account settings"
    />

    <div class="flex flex-col lg:flex-row lg:space-x-12">
      <aside class="w-full max-w-xl lg:w-48">
        <nav class="flex flex-col space-y-1 space-x-0">
          <Button
            v-for="item in sidebarNavItems"
            :key="item.href"
            variant="ghost"
            :class="[
              'w-full justify-start',
              { 'bg-muted': page.url === item.href },
            ]"
            as-child
          >
            <Link :href="item.href">
              {{ item.title }}
            </Link>
          </Button>
        </nav>
      </aside>

      <Separator class="my-6 lg:hidden" />

      <div class="flex-1 md:max-w-2xl">
        <section class="max-w-xl space-y-12">
          <slot />
        </section>
      </div>
    </div>
  </div>
</template>
