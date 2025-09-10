<script setup lang="ts">
import { Form } from "@inertiajs/vue3"
import { ref } from "vue"

import HeadingSmall from "@/components/HeadingSmall.vue"
import InputError from "@/components/InputError.vue"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usersPath } from "@/routes"

const passwordInput = ref<HTMLInputElement | null>(null)
</script>

<template>
  <div class="space-y-6">
    <HeadingSmall
      title="Delete account"
      description="Delete your account and all of its resources"
    />
    <div
      class="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10"
    >
      <div class="relative space-y-0.5 text-red-600 dark:text-red-100">
        <p class="font-medium">Warning</p>
        <p class="text-sm">
          Please proceed with caution, this cannot be undone.
        </p>
      </div>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="destructive">Delete account</Button>
        </DialogTrigger>
        <DialogContent>
          <Form
            method="delete"
            :action="usersPath()"
            :options="{ preserveScroll: true }"
            :onError="() => passwordInput?.focus()"
            resetOnSuccess
            className="space-y-6"
            #default="{ resetAndClearErrors, processing, errors }"
          >
            <DialogHeader class="space-y-3">
              <DialogTitle
                >Are you sure you want to delete your account?</DialogTitle
              >
              <DialogDescription>
                Once your account is deleted, all of its resources and data will
                also be permanently deleted. Please enter your password to
                confirm you would like to permanently delete your account.
              </DialogDescription>
            </DialogHeader>

            <div class="grid gap-2">
              <Label for="password_challenge" class="sr-only">Password</Label>
              <Input
                id="password_challenge"
                type="password"
                name="password_challenge"
                ref="passwordInput"
                placeholder="Password"
              />
              <InputError :message="errors.password_challenge" />
            </div>

            <DialogFooter class="gap-2">
              <DialogClose as-child>
                <Button variant="secondary" @click="resetAndClearErrors">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                variant="destructive"
                :disabled="processing"
              >
                Delete account
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>
