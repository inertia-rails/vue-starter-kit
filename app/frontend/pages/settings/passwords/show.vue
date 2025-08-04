<script setup lang="ts">
import type { Errors } from "@inertiajs/core"
import { Head, useForm } from "@inertiajs/vue3"
import { ref } from "vue"

import HeadingSmall from "@/components/HeadingSmall.vue"
import InputError from "@/components/InputError.vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/AppLayout.vue"
import SettingsLayout from "@/layouts/settings/Layout.vue"
import { settingsPasswordPath } from "@/routes"
import { type BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Password settings",
    href: settingsPasswordPath(),
  },
]

const passwordInput = ref<HTMLInputElement | null>(null)
const currentPasswordInput = ref<HTMLInputElement | null>(null)

const form = useForm({
  password_challenge: "",
  password: "",
  password_confirmation: "",
})

const updatePassword = () => {
  form.put(settingsPasswordPath(), {
    preserveScroll: true,
    onSuccess: () => form.reset(),
    onError: (errors: Errors) => {
      if (errors.password) {
        form.reset("password", "password_confirmation")
        if (passwordInput.value instanceof HTMLInputElement) {
          passwordInput.value.focus()
        }
      }

      if (errors.password_challenge) {
        form.reset("password_challenge")
        if (currentPasswordInput.value instanceof HTMLInputElement) {
          currentPasswordInput.value.focus()
        }
      }
    },
  })
}
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <Head :title="breadcrumbs[breadcrumbs.length - 1].title" />

    <SettingsLayout>
      <div class="space-y-6">
        <HeadingSmall
          title="Update password"
          description="Ensure your account is using a long, random password to stay secure"
        />

        <form @submit.prevent="updatePassword" class="space-y-6">
          <div class="grid gap-2">
            <Label for="password_challenge">Current password</Label>
            <Input
              id="password_challenge"
              ref="currentPasswordInput"
              v-model="form.password_challenge"
              type="password"
              class="mt-1 block w-full"
              autocomplete="current-password"
              placeholder="Current password"
            />
            <InputError :message="form.errors.password_challenge" />
          </div>

          <div class="grid gap-2">
            <Label for="password">New password</Label>
            <Input
              id="password"
              ref="passwordInput"
              v-model="form.password"
              type="password"
              class="mt-1 block w-full"
              autocomplete="new-password"
              placeholder="New password"
            />
            <InputError :message="form.errors.password" />
          </div>

          <div class="grid gap-2">
            <Label for="password_confirmation">Confirm password</Label>
            <Input
              id="password_confirmation"
              v-model="form.password_confirmation"
              type="password"
              class="mt-1 block w-full"
              autocomplete="new-password"
              placeholder="Confirm password"
            />
            <InputError :message="form.errors.password_confirmation" />
          </div>

          <div class="flex items-center gap-4">
            <Button :disabled="form.processing">Save password</Button>

            <Transition
              enter-active-class="transition ease-in-out"
              enter-from-class="opacity-0"
              leave-active-class="transition ease-in-out"
              leave-to-class="opacity-0"
            >
              <p
                v-show="form.recentlySuccessful"
                class="text-sm text-neutral-600"
              >
                Saved.
              </p>
            </Transition>
          </div>
        </form>
      </div>
    </SettingsLayout>
  </AppLayout>
</template>
