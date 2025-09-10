<script setup lang="ts">
import { Form, Head } from "@inertiajs/vue3"
import { LoaderCircle } from "lucide-vue-next"

import InputError from "@/components/InputError.vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthLayout from "@/layouts/AuthLayout.vue"
import { identityPasswordResetPath } from "@/routes"

interface Props {
  sid: string
  email: string
}

const props = defineProps<Props>()
</script>

<template>
  <AuthLayout
    title="Reset password"
    description="Please enter your new password below"
  >
    <Head title="Reset password" />

    <Form
      method="put"
      :action="identityPasswordResetPath()"
      :transform="(data) => ({ ...data, sid, email })"
      :resetOnSuccess="['password', 'password_confirmation']"
      #default="{ errors, processing }"
    >
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            :defaultValue="props.email"
            class="mt-1 block w-full"
            readonly
          />
          <InputError :message="errors.email" class="mt-2" />
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autocomplete="new-password"
            class="mt-1 block w-full"
            autofocus
            placeholder="Password"
          />
          <InputError :message="errors.password" />
        </div>

        <div class="grid gap-2">
          <Label for="password_confirmation"> Confirm Password </Label>
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autocomplete="new-password"
            class="mt-1 block w-full"
            placeholder="Confirm password"
          />
          <InputError :message="errors.password_confirmation" />
        </div>

        <Button type="submit" class="mt-4 w-full" :disabled="processing">
          <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
          Reset password
        </Button>
      </div>
    </Form>
  </AuthLayout>
</template>
