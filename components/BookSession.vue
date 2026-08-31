<script setup lang="ts">
import { CalendarDaysIcon, UserIcon, EnvelopeIcon, PhoneIcon, WrenchIcon, ClockIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function closeMenu() {
  emit('close')
}

// Prevent body scrolling when menu is open
watch(
  () => props.open,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div
        v-if="open"
        class="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
      />
    </Transition>

    <Transition name="slide">
      <aside
        v-if="open"
        class="fixed top-0 right-0 z-50 flex h-screen w-full max-w-md flex-col bg-[#f3eae4] shadow-2xl overflow-auto"
      >
        <div class="flex items-center gap-4 w-full p-6">
          <div class="w-16 h-16 min-w-16 min-h-16 rounded-full border border-[#83684f] grid place-items-center resize-none shrink-0">
            <CalendarDaysIcon class="w-8 h-8 text-[#83684f]" />
          </div>

          <div class="flex flex-col items-start space-y-1.5">
            <p class="font-garamond text-black text-2xl font-semibold">Book Online</p>

            <p class="text-sm font-montserrat text-[#83684f]">
              Fill out the form below and we'll get back to you to confirm your booking.
            </p>
          </div>
        </div>

        <div class="w-full border-b border-[#f3eae4] py-4"></div>

        <div class="flex flex-col items-start px-6 space-y-6">
          <BaseInput
            label="Full Name"
            placeholder="Enter your full name"
            v-model="fullName"
          >
            <template #icon>
              <UserIcon class="w-5 h-5 text-[#83684f]" />
            </template>
          </BaseInput>

          <BaseInput
            label="Email Address"
            placeholder="Enter your email address"
            v-model="email"
          >
            <template #icon>
              <EnvelopeIcon class="w-5 h-5 text-[#83684f]" />
            </template>
          </BaseInput>

          <BaseInput
            label="Phone Number"
            placeholder="Enter your phone number"
            v-model="phone"
          >
            <template #icon>
              <PhoneIcon class="w-5 h-5 text-[#83684f]" />
            </template>
          </BaseInput>

          <BaseListbox
            label="Service"
            v-model="selectedService"
            :options="[{ name: 'United States', value: 'US' }, { name: 'Canada', value: 'CA' }, { name: 'United Kingdom', value: 'UK' }]"
            :option-key="'name'"
            placeholder="Select a service"
          >
            <template #icon>
              <WrenchIcon class="w-5 h-5 text-[#83684f]" />
            </template>
          </BaseListbox>

          <BaseDatePicker
            label="Preferred Date"
            v-model="selectedDate"
          />

          <BaseTimePicker v-model="time" label="Start Time">
            <template #icon>
              <ClockIcon class="h-5 w-5 text-[#83684f]" />
            </template>
          </BaseTimePicker>

          <BaseTextArea
            label="MESSAGE / NOTES"
            placeholder="Tell us anything we should know..."
            v-model="email"
          />

          <div class="flex items-center gap-4 w-full py-6">
            <button @click="closeMenu" class="border border-[#83684f] py-2.5 px-8 rounded-lg text-sm text-[#83684f] uppercase font-montserrat hidden lg:block bg-inherit w-full">Cancel</button>

            <button class="bg-[#93907f] py-2.5 px-8 rounded-lg text-sm text-white uppercase font-montserrat hidden lg:block w-full">Send</button>
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop animation */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* Slideover animation */
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.35s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>