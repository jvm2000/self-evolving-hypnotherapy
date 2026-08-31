<script setup lang="ts">
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'

interface Props {
  label: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Select date',
})

const model = defineModel<string | null>()

const isOpen = ref(false)
const currentDate = ref(new Date())
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const calendarMenu = ref<HTMLElement | null>(null)
const shouldOpenTop = ref(false)
const datePickerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const openTop = ref(false)

const handleClickOutside = (event: MouseEvent) => {
  if (!datePickerRef.value) return

  const target = event.target as Node

  if (!datePickerRef.value.contains(target)) {
    isOpen.value = false
  }
}

const updateCalendarPosition = () => {
  nextTick(() => {
    if (!calendarMenu.value) return

    const parent = calendarMenu.value.parentElement

    if (!parent) return

    const parentRect = parent.getBoundingClientRect()
    const menuHeight = calendarMenu.value.offsetHeight

    const spaceBelow = window.innerHeight - parentRect.bottom
    const spaceAbove = parentRect.top

    // Open at the top when there is not enough space below
    shouldOpenTop.value =
      spaceBelow < menuHeight + 16 &&
      spaceAbove > spaceBelow
  })
}

const selectedDate = computed(() => {
  if (!model.value) return null

  const date = new Date(`${model.value}T00:00:00`)

  return isNaN(date.getTime()) ? null : date
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const previousMonthDays = new Date(year, month, 0).getDate()

  const result: {
    date: number
    month: number
    year: number
    currentMonth: boolean
  }[] = []

  // Previous month's days
  for (let i = firstDay - 1; i >= 0; i--) {
    const date = previousMonthDays - i

    result.push({
      date,
      month: month - 1 < 0 ? 11 : month - 1,
      year: month - 1 < 0 ? year - 1 : year,
      currentMonth: false,
    })
  }

  // Current month's days
  for (let date = 1; date <= daysInMonth; date++) {
    result.push({
      date,
      month,
      year,
      currentMonth: true,
    })
  }

  // Next month's days
  const remaining = 42 - result.length

  for (let date = 1; date <= remaining; date++) {
    result.push({
      date,
      month: month + 1 > 11 ? 0 : month + 1,
      year: month + 1 > 11 ? year + 1 : year,
      currentMonth: false,
    })
  }

  return result
})

const formattedDate = computed(() => {
  if (!selectedDate.value) return ''

  return selectedDate.value.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})

const goToPreviousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1,
  )
}

const goToNextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1,
  )
}

const selectDate = (
  date: number,
  month: number,
  year: number,
) => {
  const selected = new Date(year, month, date)

  const yyyy = selected.getFullYear()
  const mm = String(selected.getMonth() + 1).padStart(2, '0')
  const dd = String(selected.getDate()).padStart(2, '0')

  model.value = `${yyyy}-${mm}-${dd}`

  isOpen.value = false
}

const isSelected = (
  date: number,
  month: number,
  year: number,
) => {
  if (!selectedDate.value) return false

  return (
    selectedDate.value.getDate() === date &&
    selectedDate.value.getMonth() === month &&
    selectedDate.value.getFullYear() === year
  )
}

const isToday = (
  date: number,
  month: number,
  year: number,
) => {
  const today = new Date()

  return (
    today.getDate() === date &&
    today.getMonth() === month &&
    today.getFullYear() === year
  )
}

const openCalendar = () => {
  if (selectedDate.value) {
    currentDate.value = new Date(
      selectedDate.value.getFullYear(),
      selectedDate.value.getMonth(),
      1,
    )
  } else {
    const today = new Date()

    currentDate.value = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    )
  }

  isOpen.value = !isOpen.value
}

watch(isOpen, (value) => {
  if (value) {
    updateCalendarPosition()
  }
})

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)

  window.addEventListener('resize', updateCalendarPosition)
  window.addEventListener('scroll', updateCalendarPosition, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)

  window.removeEventListener('resize', updateCalendarPosition)
  window.removeEventListener('scroll', updateCalendarPosition, true)
})
</script>

<template>
  <div class="relative w-full">
    <!-- Label -->
    <label
      class="mb-1.5 block text-[13px] font-medium uppercase tracking-[0.2em] text-[#71685f]"
    >
      {{ label }}
    </label>

    <!-- Date Input -->
    <button
      type="button"
      class="flex h-[46px] w-full items-center rounded-lg border border-[#e5dfd7] bg-[#fcfaf7] px-4 text-left shadow-[0_2px_5px_rgba(0,0,0,0.08)] transition focus:border-[#b8afa5] focus:outline-none focus:ring-1 focus:ring-[#b8afa5]"
      @click="openCalendar"
    >
      <!-- Icon -->
      <div
        v-if="$slots.icon"
        class="mr-3 flex shrink-0 items-center text-[#71685f]"
      >
        <slot name="icon" />
      </div>

      <CalendarDaysIcon
        v-else
        class="mr-3 h-5 w-5 shrink-0 text-[#71685f]"
      />

      <!-- Value -->
      <span
        class="flex-1 text-base"
        :class="
          formattedDate
            ? 'text-[#71685f]'
            : 'text-[#9b9187]'
        "
      >
        {{ formattedDate || placeholder }}
      </span>

      <ChevronRightIcon
        class="h-4 w-4 rotate-90 text-[#9b9187]"
      />
    </button>

    <!-- Calendar -->
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
        ref="calendarMenu"
        class="calendar-menu absolute z-50 mt-2 w-full min-w-[300px] rounded-xl border border-[#e5dfd7] bg-[#fcfaf7] p-4 shadow-[0_8px_25px_rgba(0,0,0,0.12)]"
        :class="{
          'calendar-menu--top': shouldOpenTop,
        }"
      >
        <!-- Calendar Header -->
        <div class="mb-4 flex items-center justify-between">
          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-md text-[#71685f] transition hover:bg-[#f2eee9]"
            @click="goToPreviousMonth"
          >
            <ChevronLeftIcon class="h-4 w-4" />
          </button>

          <span class="text-sm font-semibold tracking-wide text-[#71685f]">
            {{ months[currentDate.getMonth()] }}
            {{ currentDate.getFullYear() }}
          </span>

          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-md text-[#71685f] transition hover:bg-[#f2eee9]"
            @click="goToNextMonth"
          >
            <ChevronRightIcon class="h-4 w-4" />
          </button>
        </div>

        <!-- Days -->
        <div class="grid grid-cols-7 gap-1">
          <div
            v-for="day in days"
            :key="day"
            class="py-1 text-center text-[11px] font-medium uppercase tracking-wider text-[#9b9187]"
          >
            {{ day }}
          </div>

          <button
            v-for="(day, index) in calendarDays"
            :key="index"
            type="button"
            class="flex h-9 items-center justify-center rounded-md text-sm transition"
            :class="[
              !day.currentMonth
                ? 'text-[#c8c0b8]'
                : 'text-[#71685f] hover:bg-[#f2eee9]',
              isSelected(day.date, day.month, day.year)
                ? 'bg-[#71685f] text-white hover:bg-[#71685f]'
                : '',
              isToday(day.date, day.month, day.year) &&
              !isSelected(day.date, day.month, day.year)
                ? 'font-bold ring-1 ring-[#b8afa5]'
                : '',
            ]"
            @click="selectDate(day.date, day.month, day.year)"
          >
            {{ day.date }}
          </button>
        </div>

        <!-- Footer -->
        <div class="mt-4 border-t border-[#e5dfd7] pt-3">
          <button
            type="button"
            class="text-xs font-medium uppercase tracking-wider text-[#71685f] transition hover:text-[#403a35]"
            @click="
              model = null;
              isOpen = false
            "
          >
            Clear date
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.calendar-menu {
  top: 100%;
  left: 0;
  max-height: calc(100vh - 24px);
  overflow-y: auto;
}

.calendar-menu--top {
  top: auto;
  bottom: 100%;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

/* Prevent horizontal overflow on small screens */
@media (max-width: 640px) {
  .calendar-menu {
    min-width: 0;
    width: min(100%, calc(100vw - 24px));
  }
}
</style>
