<script setup lang="ts">
import { Head, Link, usePage } from "@inertiajs/vue3"

import HeadingSmall from "@/components/HeadingSmall.vue"
import { Button } from "@/components/ui/button"
import AppLayout from "@/layouts/AppLayout.vue"
import SettingsLayout from "@/layouts/settings/Layout.vue"
import { sessionPath, settingsSessionsPath } from "@/routes"
import type { BreadcrumbItem, Session } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Sessions",
    href: settingsSessionsPath(),
  },
]

interface Props {
  sessions: Session[]
}

defineProps<Props>()

const { auth } = usePage().props
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <Head :title="breadcrumbs[breadcrumbs.length - 1].title" />

    <SettingsLayout>
      <div class="space-y-6">
        <HeadingSmall
          title="Sessions"
          description="Manage your active sessions across devices"
        />
        <div class="space-y-4">
          <div
            v-for="session in sessions"
            :key="session.id"
            class="flex flex-col space-y-2 rounded-lg border p-4"
          >
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <p class="font-medium">
                  {{ session.user_agent }}
                  <Badge
                    v-if="session.id === auth.session.id"
                    variant="secondary"
                    class="ml-2"
                  >
                    Current
                  </Badge>
                </p>
                <p class="text-muted-foreground text-sm">
                  IP: {{ session.ip_address }}
                </p>
                <p class="text-muted-foreground text-sm">
                  Active since:
                  {{ new Date(session.created_at).toLocaleString() }}
                </p>
              </div>
              <Button
                v-if="session.id !== auth.session.id"
                variant="destructive"
                asChild
              >
                <Link
                  method="delete"
                  :href="sessionPath({ id: session.id })"
                  as="button"
                >
                  Log out
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  </AppLayout>
</template>
