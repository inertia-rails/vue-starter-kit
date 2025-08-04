<script setup lang="ts">
import type { Errors } from "@inertiajs/core"
import { Head, Link, useForm, usePage } from "@inertiajs/vue3"
import { ref } from "vue"

import HeadingSmall from "@/components/HeadingSmall.vue"
import InputError from "@/components/InputError.vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/AppLayout.vue"
import SettingsLayout from "@/layouts/settings/Layout.vue"
import { identityEmailVerificationPath, settingsEmailPath } from "@/routes"
import type { BreadcrumbItem, User } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Email settings",
    href: settingsEmailPath(),
  },
]

const currentPasswordInput = ref<HTMLInputElement | null>(null)

const page = usePage()
const user = page.props.auth.user as User

const form = useForm({
  password_challenge: "",
  email: user.email,
})

const submit = () => {
  form.patch(settingsEmailPath(), {
    preserveScroll: true,
    onSuccess: () => form.reset("password_challenge"),
    onError: (errors: Errors) => {
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
          title="Update email"
          description="Update your email address and verify it"
        />

        <form @submit.prevent="submit" class="space-y-6">
          <div class="grid gap-2">
            <Label for="email">Email address</Label>

            <Input
              id="email"
              type="email"
              class="mt-1 block w-full"
              v-model="form.email"
              required
              autocomplete="username"
              placeholder="Email address"
            />

            <InputError class="mt-2" :message="form.errors.email" />
          </div>

          <div v-if="!user.verified">
            <p class="text-muted-foreground -mt-4 text-sm">
              Your email address is unverified.
              <Link
                :href="identityEmailVerificationPath()"
                method="post"
                as="button"
                class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
              >
                Click here to resend the verification email.
              </Link>
            </p>
          </div>

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

          <div class="flex items-center gap-4">
            <Button :disabled="form.processing">Save</Button>

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
                Saved
              </p>
            </Transition>
          </div>
        </form>
      </div>
    </SettingsLayout>
  </AppLayout>
</template>
