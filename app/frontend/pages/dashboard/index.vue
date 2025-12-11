<script setup lang="ts">
import { Head } from "@inertiajs/vue3"
import { Calendar, Dog, Plus, Users } from "lucide-vue-next"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AppLayout from "@/layouts/AppLayout.vue"
import { dashboardPath } from "@/routes"
import { type BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: dashboardPath(),
  },
]

// Demo stats for showcasing the theme
const stats = [
  { label: "Active Clients", value: "24", icon: Users, trend: "+3 this month" },
  { label: "Dogs in Training", value: "31", icon: Dog, trend: "7 new intakes" },
  {
    label: "Sessions This Week",
    value: "18",
    icon: Calendar,
    trend: "4 tomorrow",
  },
]
</script>

<template>
  <Head :title="breadcrumbs[breadcrumbs.length - 1].title" />

  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
      <!-- Welcome Header -->
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-heading font-bold text-foreground">
            Good morning, Trainer
          </h1>
          <p class="text-muted-foreground font-body">
            Here's what's happening with your training business today.
          </p>
        </div>
        <Button size="lg" class="gap-2">
          <Plus class="size-4" />
          New Session
        </Button>
      </div>

      <!-- Stats Cards -->
      <div class="grid gap-4 md:grid-cols-3">
        <Card v-for="stat in stats" :key="stat.label">
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">
              {{ stat.label }}
            </CardTitle>
            <component
              :is="stat.icon"
              class="size-5 text-secondary"
            />
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-bold font-heading">{{ stat.value }}</div>
            <p class="text-xs text-muted-foreground mt-1">{{ stat.trend }}</p>
          </CardContent>
        </Card>
      </div>

      <!-- Theme Showcase Section -->
      <Card>
        <CardHeader>
          <CardTitle>Heritage Workwear Theme</CardTitle>
          <CardDescription>
            Your brand colors and button variants in action
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Color Palette -->
          <div>
            <h4 class="font-heading font-semibold mb-3">Color Palette</h4>
            <div class="flex flex-wrap gap-3">
              <div class="flex flex-col items-center gap-1">
                <div class="size-12 rounded-lg bg-primary shadow-sm" />
                <span class="text-xs text-muted-foreground">Barn Red</span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <div class="size-12 rounded-lg bg-secondary shadow-sm" />
                <span class="text-xs text-muted-foreground">Denim Blue</span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <div class="size-12 rounded-lg bg-accent shadow-sm" />
                <span class="text-xs text-muted-foreground">Wheat Gold</span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <div class="size-12 rounded-lg bg-canvas-cream border shadow-sm" />
                <span class="text-xs text-muted-foreground">Canvas</span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <div class="size-12 rounded-lg bg-muted shadow-sm" />
                <span class="text-xs text-muted-foreground">Muted</span>
              </div>
            </div>
          </div>

          <!-- Button Variants -->
          <div>
            <h4 class="font-heading font-semibold mb-3">Button Variants</h4>
            <div class="flex flex-wrap gap-3">
              <Button variant="default">Primary (Barn Red)</Button>
              <Button variant="secondary">Secondary (Denim)</Button>
              <Button variant="accent">Accent (Wheat)</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link Style</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <!-- Typography -->
          <div>
            <h4 class="font-heading font-semibold mb-3">Typography</h4>
            <div class="space-y-2">
              <p class="font-heading text-xl">
                Bitter — Headings with character
              </p>
              <p class="font-body">
                Source Serif 4 — Body text that's warm and readable, perfect for
                communicating with clients about their dogs' progress.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Quick Actions -->
      <div class="grid gap-4 md:grid-cols-2">
        <Card class="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <div class="flex items-center justify-between py-2 border-b border-border/50">
                <div>
                  <p class="font-medium">Max (Golden Retriever)</p>
                  <p class="text-sm text-muted-foreground">Obedience basics</p>
                </div>
                <span class="text-sm font-heading text-secondary">9:00 AM</span>
              </div>
              <div class="flex items-center justify-between py-2 border-b border-border/50">
                <div>
                  <p class="font-medium">Luna (Border Collie)</p>
                  <p class="text-sm text-muted-foreground">Agility training</p>
                </div>
                <span class="text-sm font-heading text-secondary">11:30 AM</span>
              </div>
              <div class="flex items-center justify-between py-2">
                <div>
                  <p class="font-medium">Rocky (German Shepherd)</p>
                  <p class="text-sm text-muted-foreground">Behavioral assessment</p>
                </div>
                <span class="text-sm font-heading text-secondary">2:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card class="border-l-4 border-l-secondary">
          <CardHeader>
            <CardTitle>Recent Progress</CardTitle>
            <CardDescription>Dogs making great strides</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <div class="flex items-center gap-3 py-2 border-b border-border/50">
                <div class="size-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Dog class="size-5 text-accent-foreground" />
                </div>
                <div class="flex-1">
                  <p class="font-medium">Bella mastered "stay"</p>
                  <p class="text-sm text-muted-foreground">After 4 sessions</p>
                </div>
              </div>
              <div class="flex items-center gap-3 py-2 border-b border-border/50">
                <div class="size-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Dog class="size-5 text-accent-foreground" />
                </div>
                <div class="flex-1">
                  <p class="font-medium">Cooper's leash reactivity improved</p>
                  <p class="text-sm text-muted-foreground">Great progress!</p>
                </div>
              </div>
              <div class="flex items-center gap-3 py-2">
                <div class="size-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Dog class="size-5 text-accent-foreground" />
                </div>
                <div class="flex-1">
                  <p class="font-medium">Duke completed puppy basics</p>
                  <p class="text-sm text-muted-foreground">Ready for advanced</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>
