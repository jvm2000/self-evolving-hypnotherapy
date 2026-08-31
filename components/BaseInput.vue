<script setup lang="ts">
interface Props {
  label: string
  placeholder?: string
  type?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
})

const model = defineModel<string>()
</script>

<template>
  <div class="w-full">
    <label
      class="mb-1.5 block text-[13px] font-medium uppercase tracking-[0.2em] text-[#71685f]"
    >
      {{ label }}
    </label>

    <div
      class="flex h-[46px] items-center rounded-lg border border-[#e5dfd7] bg-[#fcfaf7] px-4 shadow-[0_2px_5px_rgba(0,0,0,0.08)] transition focus-within:border-[#b8afa5] focus-within:ring-1 focus-within:ring-[#b8afa5]"
    >
      <!-- Icon -->
      <div
        v-if="$slots.icon"
        class="mr-3 flex shrink-0 items-center text-[#71685f]"
      >
        <slot name="icon" />
      </div>

      <!-- Input -->
      <input
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        class="w-full border-0 bg-transparent text-base p-0 text-[#71685f] outline-none placeholder:text-[#9b9187] focus:ring-0"
      />
    </div>
  </div>
</template>