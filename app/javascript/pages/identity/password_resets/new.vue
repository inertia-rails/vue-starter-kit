<script setup lang="ts">
import { Form, Head } from "@inertiajs/vue3"
import { LoaderCircle } from "lucide-vue-next"

import TextLink from "@/components/TextLink.vue"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import AuthLayout from "@/layouts/AuthLayout.vue"
import { identityPasswordResets, sessions } from "@/routes"
</script>

<template>
  <AuthLayout
    title="Forgot password"
    description="Enter your email to receive a password reset link"
  >
    <Head title="Forgot password" />

    <div class="space-y-6">
      <Form
        :action="identityPasswordResets.create()"
        #default="{ errors, processing }"
      >
        <Field>
          <FieldLabel for="email">Email address</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autocomplete="off"
            autofocus
            placeholder="email@example.com"
          />
          <FieldError :errors="errors.email" />
        </Field>

        <div class="my-6 flex items-center justify-start">
          <Button class="w-full" :disabled="processing">
            <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
            Email password reset link
          </Button>
        </div>
      </Form>

      <div class="text-muted-foreground space-x-1 text-center text-sm">
        <span>Or, return to</span>
        <TextLink :href="sessions.new()">log in</TextLink>
      </div>
    </div>
  </AuthLayout>
</template>
