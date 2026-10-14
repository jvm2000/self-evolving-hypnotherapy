
<script setup lang="ts">
import type { ToastType } from '~/composables/useToast'

const { toasts, remove } = useToast()

const styles: Record<ToastType, {
  icon: string
  border: string
  iconBg: string
}> = {
  success: {
    icon: '✓',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-700',
  },
  error: {
    icon: '✕',
    border: 'border-red-200',
    iconBg: 'bg-red-100 text-red-700',
  },
  warning: {
    icon: '!',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100 text-amber-700',
  },
  info: {
    icon: 'i',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100 text-blue-700',
  },
}
</script>

<template>
  <div
    class="pointer-events-none fixed right-4 bottom-4 z-[9999]
           flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3"
    aria-live="polite"
    aria-atomic="false"
  >
    <TransitionGroup
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-4 opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-4 opacity-0"
      move-class="transition-transform duration-200"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-start gap-3
               rounded-xl border bg-[#f2efec] p-4 shadow-lg"
        :class="styles[toast.type].border"
        role="status"
      >
        <div
          class="flex h-9 w-9 shrink-0 items-center
                 justify-center rounded-full font-bold"
          :class="styles[toast.type].iconBg"
        >
          {{ styles[toast.type].icon }}
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-gray-900">
            {{ toast.title }}
          </p>

          <p
            v-if="toast.message"
            class="mt-1 break-words text-sm text-gray-600"
          >
            {{ toast.message }}
          </p>
        </div>

        <button
          type="button"
          class="rounded-md px-1 text-xl leading-none
                 text-gray-400 hover:text-gray-700
                 focus:outline-none focus:ring-2
                 focus:ring-gray-400"
          :aria-label="`Dismiss ${toast.title} notification`"
          @click="remove(toast.id)"
        >
          &times;
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
