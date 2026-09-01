<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import {
  ClockIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'

interface Props {
  label: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Select time',
})

const model = defineModel<string | null>({
  default: null,
})

const isOpen = ref(false)
const timePickerRef = ref<HTMLElement | null>(null)
const timeMenu = ref<HTMLElement | null>(null)
const shouldOpenTop = ref(false)

const selectedHour = ref<number | null>(null)
const selectedMinute = ref<number | null>(null)
const selectedPeriod = ref<'AM' | 'PM' | null>(null)

// Flag to distinguish between internal updates and external v-model changes
let isInternalUpdate = false

const hours = Array.from({ length: 12 }, (_, index) => index + 1)
const minutes = Array.from({ length: 60 }, (_, index) => index)

const initializeTime = () => {
  if (!model.value) {
    selectedHour.value = null
    selectedMinute.value = null
    selectedPeriod.value = null
    return
  }

  const [hourString, minuteString] = model.value.split(':')
  const hour24 = Number(hourString)
  const minute = Number(minuteString)

  if (
    Number.isNaN(hour24) ||
    Number.isNaN(minute) ||
    hour24 < 0 ||
    hour24 > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    selectedHour.value = null
    selectedMinute.value = null
    selectedPeriod.value = null
    return
  }

  selectedPeriod.value = hour24 >= 12 ? 'PM' : 'AM'
  let hour12 = hour24 % 12
  if (hour12 === 0) {
    hour12 = 12
  }

  selectedHour.value = hour12
  selectedMinute.value = minute
}

const formattedTime = computed(() => {
  if (
    selectedHour.value === null ||
    selectedMinute.value === null ||
    selectedPeriod.value === null
  ) {
    return ''
  }

  return `${String(selectedHour.value).padStart(2, '0')}:${String(
    selectedMinute.value,
  ).padStart(2, '0')} ${selectedPeriod.value}`
})

const updateModel = () => {
  if (
    selectedHour.value === null ||
    selectedMinute.value === null ||
    selectedPeriod.value === null
  ) {
    return
  }

  let hour24 = selectedHour.value

  if (selectedPeriod.value === 'AM') {
    if (hour24 === 12) {
      hour24 = 0
    }
  } else {
    if (hour24 !== 12) {
      hour24 += 12
    }
  }

  isInternalUpdate = true
  model.value = `${String(hour24).padStart(2, '0')}:${String(
    selectedMinute.value,
  ).padStart(2, '0')}`
  
  nextTick(() => {
    isInternalUpdate = false
  })
}

const selectHour = (hour: number) => {
  selectedHour.value = hour
  // Fill sensible defaults if not set yet
  if (selectedMinute.value === null) selectedMinute.value = 0
  if (selectedPeriod.value === null) selectedPeriod.value = 'AM'
  updateModel()
}

const selectMinute = (minute: number) => {
  selectedMinute.value = minute
  // Fill sensible defaults if not set yet
  if (selectedHour.value === null) selectedHour.value = 12
  if (selectedPeriod.value === null) selectedPeriod.value = 'AM'
  updateModel()
}

const selectPeriod = (period: 'AM' | 'PM') => {
  selectedPeriod.value = period
  // Fill sensible defaults if not set yet
  if (selectedHour.value === null) selectedHour.value = 12
  if (selectedMinute.value === null) selectedMinute.value = 0
  updateModel()
}

const openTimePicker = () => {
  initializeTime()
  isOpen.value = !isOpen.value
}

const clearTime = () => {
  isInternalUpdate = true
  model.value = null
  selectedHour.value = null
  selectedMinute.value = null
  selectedPeriod.value = null
  isOpen.value = false

  nextTick(() => {
    isInternalUpdate = false
  })
}

const handleClickOutside = (event: MouseEvent) => {
  if (!timePickerRef.value) return
  const target = event.target as Node
  if (!timePickerRef.value.contains(target)) {
    isOpen.value = false
  }
}

const updateTimePickerPosition = () => {
  nextTick(() => {
    if (!timeMenu.value || !timePickerRef.value) return

    const parentRect = timePickerRef.value.getBoundingClientRect()
    const menuHeight = timeMenu.value.offsetHeight
    const spaceBelow = window.innerHeight - parentRect.bottom
    const spaceAbove = parentRect.top

    shouldOpenTop.value =
      spaceBelow < menuHeight + 16 && spaceAbove > spaceBelow
  })
}

const scrollSelectedIntoView = () => {
  nextTick(() => {
    const selected = timeMenu.value?.querySelector('[data-selected="true"]')
    selected?.scrollIntoView({
      block: 'center',
      behavior: 'auto',
    })
  })
}

watch(isOpen, (value) => {
  if (value) {
    updateTimePickerPosition()
    scrollSelectedIntoView()
  }
})

// Synchronize external prop changes only
watch(model, () => {
  if (!isInternalUpdate) {
    initializeTime()
  }
})

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  window.addEventListener('resize', updateTimePickerPosition)
  window.addEventListener('scroll', updateTimePickerPosition, true)
  initializeTime()
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  window.removeEventListener('resize', updateTimePickerPosition)
  window.removeEventListener('scroll', updateTimePickerPosition, true)
})
</script>

<template>
  <div
    ref="timePickerRef"
    class="relative w-full"
  >
    <!-- Label -->
    <label
      class="mb-1.5 block text-[13px] font-medium uppercase tracking-[0.2em] text-[#71685f]"
    >
      {{ label }}
    </label>

    <!-- Time Input -->
    <button
      type="button"
      class="flex h-[46px] w-full items-center rounded-lg border border-[#e5dfd7] bg-[#fcfaf7] px-4 text-left shadow-[0_2px_5px_rgba(0,0,0,0.08)] transition focus:border-[#b8afa5] focus:outline-none focus:ring-1 focus:ring-[#b8afa5]"
      @click="openTimePicker"
    >
      <!-- Icon -->
      <div
        v-if="$slots.icon"
        class="mr-3 flex shrink-0 items-center text-[#71685f]"
      >
        <slot name="icon" />
      </div>

      <ClockIcon
        v-else
        class="mr-3 h-5 w-5 shrink-0 text-[#71685f]"
      />

      <!-- Value -->
      <span
        class="flex-1 text-base"
        :class="
          formattedTime
            ? 'text-[#71685f]'
            : 'text-[#9b9187]'
        "
      >
        {{ formattedTime || placeholder }}
      </span>

      <ChevronDownIcon
        class="h-4 w-4 text-[#9b9187] transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Time Picker -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <div
        v-if="isOpen"
        ref="timeMenu"
        class="time-menu absolute z-50 mt-2 w-full min-w-[300px] rounded-xl border border-[#e5dfd7] bg-[#fcfaf7] p-4 shadow-[0_8px_25px_rgba(0,0,0,0.12)]"
        :class="{
          'time-menu--top': shouldOpenTop,
        }"
      >
        <!-- Header -->
        <div
          class="mb-4 flex items-center justify-between"
        >
          <div>
            <p
              class="text-[11px] font-medium uppercase tracking-[0.2em] text-[#9b9187]"
            >
              Select time
            </p>

            <p
              class="mt-1 text-lg font-semibold tracking-wide text-[#71685f]"
            >
              {{ formattedTime || '--:-- --' }}
            </p>
          </div>

          <ClockIcon
            class="h-5 w-5 text-[#9b9187]"
          />
        </div>

        <!-- Time Selector -->
        <div
          class="flex items-center justify-center gap-2"
        >
          <!-- Hours -->
          <div class="time-column">
            <div
              class="mb-2 text-center text-[11px] font-medium uppercase tracking-wider text-[#9b9187]"
            >
              Hour
            </div>

            <div class="time-scroll">
              <button
                v-for="hour in hours"
                :key="hour"
                type="button"
                class="time-option"
                :data-selected="
                  selectedHour === hour
                "
                :class="
                  selectedHour === hour
                    ? 'time-option-selected'
                    : ''
                "
                @click="selectHour(hour)"
              >
                {{ String(hour).padStart(2, '0') }}
              </button>
            </div>
          </div>

          <!-- Separator -->
          <div
            class="mt-6 text-xl font-semibold text-[#9b9187]"
          >
            :
          </div>

          <!-- Minutes -->
          <div class="time-column">
            <div
              class="mb-2 text-center text-[11px] font-medium uppercase tracking-wider text-[#9b9187]"
            >
              Minute
            </div>

            <div class="time-scroll">
              <button
                v-for="minute in minutes"
                :key="minute"
                type="button"
                class="time-option"
                :data-selected="
                  selectedMinute === minute
                "
                :class="
                  selectedMinute === minute
                    ? 'time-option-selected'
                    : ''
                "
                @click="selectMinute(minute)"
              >
                {{ String(minute).padStart(2, '0') }}
              </button>
            </div>
          </div>

          <!-- AM / PM -->
          <div class="time-column ml-2">
            <div
              class="mb-2 text-center text-[11px] font-medium uppercase tracking-wider text-[#9b9187]"
            >
              Period
            </div>

            <div
              class="flex flex-col gap-1 rounded-lg border border-[#e5dfd7] p-1"
            >
              <button
                type="button"
                class="period-option"
                :class="
                  selectedPeriod === 'AM'
                    ? 'period-option-selected'
                    : ''
                "
                @click="selectPeriod('AM')"
              >
                AM
              </button>

              <button
                type="button"
                class="period-option"
                :class="
                  selectedPeriod === 'PM'
                    ? 'period-option-selected'
                    : ''
                "
                @click="selectPeriod('PM')"
              >
                PM
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="mt-4 flex items-center justify-between border-t border-[#e5dfd7] pt-3"
        >
          <button
            type="button"
            class="text-xs font-medium uppercase tracking-wider text-[#71685f] transition hover:text-[#403a35]"
            @click="clearTime"
          >
            Clear time
          </button>

          <button
            type="button"
            class="text-xs font-medium uppercase tracking-wider text-[#71685f] transition hover:text-[#403a35]"
            @click="isOpen = false"
          >
            Done
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.time-menu {
  top: 100%;
  left: 0;
  max-height: calc(100vh - 24px);
  overflow-y: auto;
}

.time-menu--top {
  top: auto;
  bottom: 100%;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.time-column {
  min-width: 64px;
}

.time-scroll {
  display: flex;
  max-height: 190px;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
  padding: 2px;

  scrollbar-width: thin;
  scrollbar-color: #d8d0c8 transparent;
}

.time-scroll::-webkit-scrollbar {
  width: 4px;
}

.time-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.time-scroll::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: #d8d0c8;
}

.time-option {
  display: flex;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;

  color: #71685f;
  font-size: 14px;

  transition:
    background-color 150ms ease,
    color 150ms ease;
}

.time-option:hover {
  background: #f2eee9;
}

.time-option-selected {
  background: #71685f !important;
  color: white !important;
}

.time-option-selected:hover {
  background: #71685f !important;
}

.period-option {
  display: flex;
  height: 36px;
  width: 52px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;

  color: #71685f;
  font-size: 13px;
  font-weight: 500;

  transition:
    background-color 150ms ease,
    color 150ms ease;
}

.period-option:hover {
  background: #f2eee9;
}

.period-option-selected {
  background: #71685f;
  color: white;
}

.period-option-selected:hover {
  background: #71685f;
}

@media (max-width: 640px) {
  .time-menu {
    min-width: 0;
    width: min(100%, calc(100vw - 24px));
  }

  .time-column {
    min-width: 58px;
  }

  .period-option {
    width: 48px;
  }
}
</style>