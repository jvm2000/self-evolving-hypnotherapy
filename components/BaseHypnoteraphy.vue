<script setup lang="ts">
const props = defineProps<{
  label: string,
  description: string
}>()
</script>

<template>
  <div class="px-10">
    <div class="flex items-center gap-6">
      <div class="w-20 h-20 min-w-20 min-h-20 shrink-0 rounded-full border border-[#c0b2a4] grid place-items-center">
        <slot />
      </div>

      <div class="flex flex-col items-start space-y-1">
        <p class="text-sm font-montserrat text-[#8a7058] font-medium uppercase">{{ props.label }}</p>
        <p class="text-xs font-montserrat text-[#8a7058] text-left w-40">
          {{ props.description }}
        </p>
      </div>
    </div>
  </div>
</template>