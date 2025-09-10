<script setup lang="ts">
import { Form, Head, usePage } from "@inertiajs/vue3"

import DeleteUser from "@/components/DeleteUser.vue"
import HeadingSmall from "@/components/HeadingSmall.vue"
import InputError from "@/components/InputError.vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/AppLayout.vue"
import SettingsLayout from "@/layouts/settings/Layout.vue"
import { settingsProfilePath } from "@/routes"
import { type BreadcrumbItem, type User } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Profile settings",
    href: settingsProfilePath(),
  },
]

const page = usePage()
const user = page.props.auth.user as User
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <Head :title="breadcrumbs[breadcrumbs.length - 1].title" />

    <SettingsLayout>
      <div class="flex flex-col space-y-6">
        <HeadingSmall
          title="Profile information"
          description="Update your name and email address"
        />

        <Form
          method="patch"
          :action="settingsProfilePath()"
          :options="{ preserveScroll: true }"
          class="space-y-6"
          #default="{ errors, processing, recentlySuccessful }"
        >
          <div class="grid gap-2">
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
              :defaultValue="user.name"
              class="mt-1 block w-full"
              required
              autocomplete="name"
              placeholder="Full name"
            />
            <InputError class="mt-2" :message="errors.name" />
          </div>

          <div class="flex items-center gap-4">
            <Button :disabled="processing">Save</Button>

            <Transition
              enter-active-class="transition ease-in-out"
              enter-from-class="opacity-0"
              leave-active-class="transition ease-in-out"
              leave-to-class="opacity-0"
            >
              <p v-show="recentlySuccessful" class="text-sm text-neutral-600">
                Saved.
              </p>
            </Transition>
          </div>
        </Form>
      </div>

      <DeleteUser />
    </SettingsLayout>
  </AppLayout>
</template>
