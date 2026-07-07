<script setup lang="ts">
import { Form, Head } from "@inertiajs/vue3"

import HeadingSmall from "@/components/HeadingSmall.vue"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import AppLayout from "@/layouts/AppLayout.vue"
import SettingsLayout from "@/layouts/settings/Layout.vue"
import { settingsPasswords } from "@/routes"
import { type BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Password settings",
    href: settingsPasswords.show().url,
  },
]
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

        <Form
          class="space-y-6"
          :action="settingsPasswords.update()"
          :options="{ preserveScroll: true }"
          resetOnError
          resetOnSuccess
          #default="{ errors, processing, recentlySuccessful }"
        >
          <FieldGroup>
            <Field>
              <FieldLabel for="password_challenge">Current password</FieldLabel>
              <Input
                id="password_challenge"
                name="password_challenge"
                type="password"
                autocomplete="current-password"
                placeholder="Current password"
              />
              <FieldError :errors="errors.password_challenge" />
            </Field>

            <Field>
              <FieldLabel for="password">New password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                placeholder="New password"
              />
              <FieldError :errors="errors.password" />
            </Field>

            <Field>
              <FieldLabel for="password_confirmation">
                Confirm password
              </FieldLabel>
              <Input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                autocomplete="new-password"
                placeholder="Confirm password"
              />
              <FieldError :errors="errors.password_confirmation" />
            </Field>
          </FieldGroup>

          <div class="flex items-center gap-4">
            <Button :disabled="processing">Save password</Button>

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
    </SettingsLayout>
  </AppLayout>
</template>
