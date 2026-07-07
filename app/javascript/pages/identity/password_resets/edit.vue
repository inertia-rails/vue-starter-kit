<script setup lang="ts">
import { Form, Head } from "@inertiajs/vue3"
import { LoaderCircle } from "lucide-vue-next"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import AuthLayout from "@/layouts/AuthLayout.vue"
import { identityPasswordResets } from "@/routes"

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
      :action="identityPasswordResets.update()"
      :transform="(data) => ({ ...data, sid, email })"
      :resetOnSuccess="['password', 'password_confirmation']"
      #default="{ errors, processing }"
    >
      <FieldGroup>
        <Field>
          <FieldLabel for="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            :defaultValue="props.email"
            readonly
          />
          <FieldError :errors="errors.email" />
        </Field>

        <Field>
          <FieldLabel for="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            autocomplete="new-password"
            autofocus
            placeholder="Password"
          />
          <FieldError :errors="errors.password" />
        </Field>

        <Field>
          <FieldLabel for="password_confirmation">
            Confirm Password
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

        <Button type="submit" class="mt-4 w-full" :disabled="processing">
          <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
          Reset password
        </Button>
      </FieldGroup>
    </Form>
  </AuthLayout>
</template>
