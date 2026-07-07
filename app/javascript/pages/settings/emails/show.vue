<script setup lang="ts">
import { Form, Head, Link, usePage } from "@inertiajs/vue3"

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
import { identityEmailVerifications, settingsEmails } from "@/routes"
import type { BreadcrumbItem, User } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Email settings",
    href: settingsEmails.show().url,
  },
]

const page = usePage()
const user = page.props.auth.user as User
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <Head :title="breadcrumbs[breadcrumbs.length - 1].title" />

    <SettingsLayout>
      <div class="space-y-6">
        <HeadingSmall
          title="Update email"
          description="Update your email address and verify it"
        />

        <Form
          :action="settingsEmails.update()"
          :options="{ preserveScroll: true }"
          :resetOnError="['password_challenge']"
          :resetOnSuccess="['password_challenge']"
          class="space-y-6"
          #default="{ errors, processing, recentlySuccessful }"
        >
          <FieldGroup>
            <Field>
              <FieldLabel for="email">Email address</FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
                :defaultValue="user.email"
                required
                autocomplete="username"
                placeholder="Email address"
              />

              <FieldError :errors="errors.email" />
            </Field>

            <div v-if="!user.verified">
              <p class="text-muted-foreground -mt-4 text-sm">
                Your email address is unverified.
                <Link
                  :href="identityEmailVerifications.create()"
                  as="button"
                  class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                >
                  Click here to resend the verification email.
                </Link>
              </p>
            </div>

            <Field>
              <FieldLabel for="password_challenge">Current password</FieldLabel>

              <Input
                id="password_challenge"
                name="password_challenge"
                ref="currentPasswordInput"
                type="password"
                autocomplete="current-password"
                placeholder="Current password"
              />

              <FieldError :errors="errors.password_challenge" />
            </Field>
          </FieldGroup>

          <div class="flex items-center gap-4">
            <Button :disabled="processing">Save</Button>

            <Transition
              enter-active-class="transition ease-in-out"
              enter-from-class="opacity-0"
              leave-active-class="transition ease-in-out"
              leave-to-class="opacity-0"
            >
              <p v-show="recentlySuccessful" class="text-sm text-neutral-600">
                Saved
              </p>
            </Transition>
          </div>
        </Form>
      </div>
    </SettingsLayout>
  </AppLayout>
</template>
