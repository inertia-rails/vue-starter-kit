<script setup lang="ts">
import { Link, router } from "@inertiajs/vue3"
import { LogOut, Settings } from "lucide-vue-next"

import UserInfo from "@/components/UserInfo.vue"
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { sessionPath, settingsProfilePath } from "@/routes"
import type { User } from "@/types"

interface Props {
  auth: {
    session: {
      id: string
    }
    user: User
  }
}

const handleLogout = () => {
  router.flushAll()
}

defineProps<Props>()
</script>

<template>
  <DropdownMenuLabel class="p-0 font-normal">
    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <UserInfo :user="auth.user" :show-email="true" />
    </div>
  </DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuItem :as-child="true">
      <Link
        class="block w-full"
        :href="settingsProfilePath()"
        prefetch
        as="button"
      >
        <Settings class="mr-2 h-4 w-4" />
        Settings
      </Link>
    </DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuItem :as-child="true">
    <Link
      class="block w-full"
      method="delete"
      :href="sessionPath({ id: auth.session.id })"
      @click="handleLogout"
      as="button"
    >
      <LogOut class="mr-2 h-4 w-4" />
      Log out
    </Link>
  </DropdownMenuItem>
</template>
