<script setup lang="ts">
const props = defineProps<{
  index: string,
  label: string,
  description: string,
  contents: string[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 items-start gap-8 sm:gap-16 sm:2xl:gap-24">
    <div class="col-span-1 flex flex-col items-start space-y-6 pt-4">
      <!-- Hidden -->
      <p v-if="false" class="text-3xl font-montserrat text-[#b07750]">{{ props.index }}</p> 

      <p class="text-3xl font-garamond text-black tracking-wide">{{ props.label }}</p>

      <div class="w-16 h-[1px] bg-[#b07750]" />

      <p class="text-2xl font-alexBrush text-[#b07750] font-medium">
        {{ props.description }}
      </p>
    </div>

    <div class="col-span-2 flex flex-col items-start space-y-6">
      <p v-for="con in contents" class="text-base text-[#3a2d20] text-left font-montserrat">
        {{ con }}
      </p>
    </div>
  </div>
</template>