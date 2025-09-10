<script setup lang="ts">
import { Form, Head } from "@inertiajs/vue3"
import { LoaderCircle } from "lucide-vue-next"

import InputError from "@/components/InputError.vue"
import TextLink from "@/components/TextLink.vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthBase from "@/layouts/AuthLayout.vue"
import { newIdentityPasswordResetPath, signInPath, signUpPath } from "@/routes"
</script>

<template>
  <AuthBase
    title="Log in to your account"
    description="Enter your email and password below to log in"
  >
    <Head title="Log in" />

    <Form
      method="post"
      :action="signInPath()"
      :resetOnSuccess="['password']"
      class="flex flex-col gap-6"
      #default="{ errors, processing }"
    >
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Label for="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autofocus
            :tabindex="1"
            autocomplete="email"
            placeholder="email@example.com"
          />
          <InputError :message="errors.email" />
        </div>

        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <Label for="password">Password</Label>
            <TextLink
              :href="newIdentityPasswordResetPath()"
              class="text-sm"
              :tabindex="5"
            >
              Forgot password?
            </TextLink>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            :tabindex="2"
            autocomplete="current-password"
            placeholder="Password"
          />
          <InputError :message="errors.password" />
        </div>

        <Button
          type="submit"
          class="mt-4 w-full"
          :tabindex="4"
          :disabled="processing"
        >
          <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
          Log in
        </Button>
      </div>

      <div class="text-muted-foreground text-center text-sm">
        Don't have an account?
        <TextLink :href="signUpPath()" :tabindex="5">Sign up</TextLink>
      </div>
    </Form>
  </AuthBase>
</template>
