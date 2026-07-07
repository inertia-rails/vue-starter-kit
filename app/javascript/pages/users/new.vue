<script setup lang="ts">
import { Form, Head } from "@inertiajs/vue3"
import { LoaderCircle } from "lucide-vue-next"

import TextLink from "@/components/TextLink.vue"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import AuthBase from "@/layouts/AuthLayout.vue"
import { sessions, users } from "@/routes"
</script>

<template>
  <AuthBase
    title="Create an account"
    description="Enter your details below to create your account"
  >
    <Head title="Register" />

    <Form
      :action="users.create()"
      :resetOnSuccess="['password', 'password_confirmation']"
      disableWhileProcessing
      class="flex flex-col gap-6"
      #default="{ errors, processing }"
    >
      <FieldGroup>
        <Field>
          <FieldLabel for="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autofocus
            :tabindex="1"
            autocomplete="name"
            placeholder="Full name"
          />
          <FieldError :errors="errors.name" />
        </Field>

        <Field>
          <FieldLabel for="email">Email address</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            required
            :tabindex="2"
            autocomplete="email"
            placeholder="email@example.com"
          />
          <FieldError :errors="errors.email" />
        </Field>

        <Field>
          <FieldLabel for="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
            :tabindex="3"
            autocomplete="new-password"
            placeholder="Password"
          />
          <FieldError :errors="errors.password" />
        </Field>

        <Field>
          <FieldLabel for="password_confirmation">Confirm password</FieldLabel>
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required
            :tabindex="4"
            autocomplete="new-password"
            placeholder="Confirm password"
          />
          <FieldError :errors="errors.password_confirmation" />
        </Field>

        <Button
          type="submit"
          class="mt-2 w-full"
          :tabindex="5"
          :disabled="processing"
        >
          <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
          Create account
        </Button>
      </FieldGroup>

      <div class="text-muted-foreground text-center text-sm">
        Already have an account?
        <TextLink
          :href="sessions.new()"
          class="underline underline-offset-4"
          :tabindex="6"
          >Log in</TextLink
        >
      </div>
    </Form>
  </AuthBase>
</template>
