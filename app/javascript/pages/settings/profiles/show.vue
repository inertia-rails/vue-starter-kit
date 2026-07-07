<script setup lang="ts">
import { Form, Head, usePage } from "@inertiajs/vue3"

import DeleteUser from "@/components/DeleteUser.vue"
import HeadingSmall from "@/components/HeadingSmall.vue"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import AppLayout from "@/layouts/AppLayout.vue"
import SettingsLayout from "@/layouts/settings/Layout.vue"
import { settingsProfiles } from "@/routes"
import { type BreadcrumbItem, type User } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Profile settings",
    href: settingsProfiles.show().url,
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
          :action="settingsProfiles.update()"
          :options="{ preserveScroll: true }"
          class="space-y-6"
          #default="{ errors, processing, recentlySuccessful }"
        >
          <Field>
            <FieldLabel for="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              :defaultValue="user.name"
              required
              autocomplete="name"
              placeholder="Full name"
            />
            <FieldError :errors="errors.name" />
          </Field>

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
