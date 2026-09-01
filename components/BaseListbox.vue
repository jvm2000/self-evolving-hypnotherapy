<script setup lang="ts" generic="T extends Record<string, any>, K extends keyof T">
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { useEventListener } from '@vueuse/core'
import { XMarkIcon, LockClosedIcon } from '@heroicons/vue/24/solid'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { twMerge } from 'tailwind-merge'

defineOptions({ inheritAttrs: false })

// value for the extra option so it never matches real options
const extraOptionValue = {}

type Props = {
  /**
   * The options to be display.
   */
  options: T[],

  /**
   * The key of the options needed to be displayed.
   */
  optionKey: K,

  /**
   * The empty message where if the given options is empty.
   */
  emptyMessage: string,

  /**
   * If the listbox is clearable or not
   */
  clearable: boolean,

  /**
   * The placeholder to display for the listbox.
   */
  placeholder: string,

  /**
   * If the listbox menu uses the max height
   */
  maxPeakHeight: boolean

  /**
   * If the listbox menu has an extra option for a function
   */
  hasExtraOption: boolean

  /**
   * name of the extra option
   */
  extraOption: {
    name: string,
    id: string,
    callback: Function
  }

  /**
   * The label to display for the input.
   */
  label: string,

  /**
   * An error message or messages value indicating whether the listbox is in an error state.
   */
  error?: string,

  classes?: {
    button?: string,
    options?: string,
    wrapper?: string,
  }

  /**
   * Whether the options should render in a portal.
   * Disable in slide-over/modal contexts to avoid layering glitches.
   */
  portalled: boolean
}

const props = withDefaults(
  defineProps<{
    options: Props['options'],
    optionKey: Props['optionKey'],
    emptyMessage?: Props['emptyMessage'],
    maxPeakHeight?: Props['maxPeakHeight'],
    hasExtraOption?: Props['hasExtraOption'],
    extraOption?: Props['extraOption'],
    clearable?: boolean,
    portalled?: boolean,
    placeholder?: Props['placeholder'],
    label?: Props['label'],
    error?: Props['error'],
    classes?: Props['classes'],
  }>(),
  {
    options: () => [],
    emptyMessage: 'Nothing found.',
    maxPeakHeight: false,
    hasExtraOption: false,
    clearable: false,
    portalled: true,
    error: ''
  }
)

const modelValue = defineModel<any>({
  default: null,
})
const errorMessage = ref('')
const open = ref(false)
const triggerWrapperRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const dropdownPosition = computed<'popper' | 'item-aligned'>(() => 'popper')
const shouldAvoidCollisions = computed(() => true)
const sideOffset = computed(() => props.portalled ? 4 : 6)

// Close when pointer down is outside both trigger and portaled dropdown (fixes modal + mobile).
// Also close when pointer down is on the trigger (re-click to close). Handled here in pointerdown
// so we don't close on the same tap that opened (which would happen if we used @click on the trigger).
function handleOutsideOrTriggerClose(e: { target: EventTarget | null; preventDefault(): void; stopPropagation(): void }) {
  if (!open.value) return
  const target = e.target as Node
  const triggerEl = triggerWrapperRef.value
  const dropdownEl = dropdownRef.value
  if (!triggerEl) return
  // Clicking inside dropdown should never be treated as trigger re-click.
  if (dropdownEl && dropdownEl.contains(target)) {
    return
  }
  // Re-click trigger: close and prevent Reka from toggling it back open
  if (triggerEl.contains(target)) {
    open.value = false
    e.preventDefault()
    e.stopPropagation()
    return
  }
  // Click outside both trigger and dropdown: close
  open.value = false
}

useEventListener(
  typeof document !== 'undefined' ? document : null,
  'pointerdown',
  handleOutsideOrTriggerClose,
  { capture: true }
)

// On mobile, touchstart often fires before pointerdown and may have different target; handle it so re-tap trigger closes.
useEventListener(
  typeof document !== 'undefined' ? document : null,
  'touchstart',
  handleOutsideOrTriggerClose,
  { capture: true }
)

function handleUpdate() {
  errorMessage.value = ''
}

function handleExtraOptionSelect(event: { preventDefault: () => void }) {
  event.preventDefault()
  open.value = false
  props.extraOption?.callback()
}

// Compare by reference first; then by optionKey so the selected item is always
// recognized for focus/highlight even if the parent passes a different reference.
function getCompareBy(optionKey: K) {
  return (a: unknown, b: unknown) => {
    if (a === b) return true
    if (
      a &&
      b &&
      typeof a === 'object' &&
      typeof b === 'object' &&
      optionKey in a &&
      optionKey in b
    ) {
      return (a as T)[optionKey] === (b as T)[optionKey]
    }
    return false
  }
}

watch(
  () => props.options,
  (options) => {
    if (modelValue.value === null && options.length > 0) {
      modelValue.value = options[0]
    }
  },
  { immediate: true },
)

watchEffect(() => {
  errorMessage.value = props.error
})
</script>

<template>
  <div
    :class="[twMerge(
      'w-full relative',
      props.classes?.wrapper ?? ''
    )]"
  >
    <SelectRoot
      v-bind="$attrs"
      v-model="modelValue"
      v-model:open="open"
      :by="getCompareBy(optionKey)"
      @update:model-value="handleUpdate"
    >
      <label v-if="props.label" class="block text-[13px] font-medium uppercase tracking-[0.2em] text-[#71685f]">
        {{ props.label }}
      </label>
      <div ref="triggerWrapperRef" class="relative" :class="{ 'mt-1': props.label }">
        <!-- When open, this overlay covers the trigger so a tap on mobile reliably closes (avoids touch target issues) -->
        <div
          v-show="open"
          aria-hidden="true"
          class="absolute inset-0 z-10 cursor-default"
          @pointerdown.prevent.stop="open = false"
          @touchstart.prevent.stop="open = false"
        />
        <SelectTrigger
          :class="[twMerge(
            'flex w-full cursor-default items-center rounded-lg border border-[#e5dfd7] bg-[#fcfaf7] shadow-[0_2px_5px_rgba(0,0,0,0.08)]',
            open && !errorMessage && 'outline-blue-500 dark:outline-blue-400',
            // Match BaseInput: override both light and dark outline tokens so the
            // red error ring is visible in dark mode (dark:outline-slate-400 alone wins otherwise).
            errorMessage && 'outline-red-500 dark:outline-red-400',
            $slots.icon && 'py-3',
            props.classes?.button ?? ''
          )]"
        >
          <div class="min-w-0 flex-1">
            <SelectValue :placeholder="placeholder">
              <span v-if="modelValue" class="min-h-9 flex items-center gap-3 truncate pr-2 text-base pl-[52px]">
                <span class="truncate text-[#71685f]">{{ modelValue[optionKey] }}</span>
              </span>
              <span
                v-else
                class="min-h-9 flex items-center truncate pl-[52px] text-base text-[#71685f]/80"
                :class="{ 'text-red-600 dark:text-red-400': errorMessage, '': !errorMessage }"
              >
                {{ placeholder }}
              </span>
            </SelectValue>
          </div>
          <SelectIcon v-if="(!modelValue || !clearable)" as-child>
            <ChevronDownIcon
              class="shrink-0 w-6 h-6 stroke-[#83684f] mr-2"
              :class="{
                'text-slate-400 dark:text-slate-300': !open && !errorMessage,
                'text-blue-500 dark:text-blue-400': open && !errorMessage,
                'text-red-600 dark:text-red-400': errorMessage
              }"
              aria-hidden="true"
            />
          </SelectIcon>
        </SelectTrigger>
        <XMarkIcon
          v-if="(modelValue && clearable)"
          @click.prevent="modelValue = null"
          class="size-5 sm:size-4 cursor-default absolute right-0 top-1/2 mr-[9px] -translate-y-1/2"
          :class="{
            'text-slate-400 dark:text-slate-300': !open && !errorMessage,
            'text-blue-500 dark:text-blue-400': open && !errorMessage,
            'text-red-600 dark:text-red-400': errorMessage
          }"
          aria-hidden="true"
        />
        <div
          v-if="$slots.icon"
          class="absolute left-4 mr-[9px] bottom-4"
        >
          <slot name="icon" />
        </div>

        <component :is="props.portalled ? SelectPortal : 'div'">
          <div ref="dropdownRef">
            <SelectContent
              :position="dropdownPosition"
              :body-lock="props.portalled"
              :side-offset="sideOffset"
              align="start"
              :avoid-collisions="shouldAvoidCollisions"
              :collision-padding="12"
              sticky="partial"
              :class="[twMerge(
              props.portalled ? 'z-[9999]' : 'z-20',
                'w-[var(--reka-select-trigger-width)] max-w-[calc(100vw-1.5rem)] max-h-[var(--reka-select-content-available-height)] data-[side=bottom]:mt-1 data-[side=top]:mb-1 overflow-auto border border-[#e5dfd7] bg-[#fcfaf7] p-2 text-base shadow-lg focus:outline-hidden sm:text-sm text-left',
              maxPeakHeight && 'max-h-80',
              hasExtraOption && 'pt-1 pb-0',
              props.classes?.options ?? ''
            )]"
          >
            <SelectViewport>
              <div v-if="!options.length" class="relative cursor-default select-none py-2 px-4 text-slate-600 dark:text-slate-400">
                {{ props.emptyMessage }}
              </div>

              <SelectItem
                v-for="(option, index) in options"
                :key="index"
                :value="option"
                :text-value="String(option[optionKey])"
                :disabled="option.is_locked"
                :class="[
                  'px-2 outline-hidden select-none py-2 pr-4 rounded-md',
                  option.is_locked
                    ? 'cursor-not-allowed opacity-60 text-slate-500'
                    : 'cursor-pointer hover:bg-[#71685f] data-[highlighted]:bg-[#71685f]/10 data-[state=checked]:font-medium data-[state=checked]:text-blue-500 dark:data-[state=checked]:text-blue-400 text-[#71685f] text-base',
                ]"
              >
                <slot name="option" :option="option" :active="false" :selected="modelValue === option">
                  <SelectItemText>
                    <span
                      :class="[
                        (option.img || option.is_locked) && 'flex place-items-center gap-2',
                        'block truncate',
                      ]"
                    >
                      <img v-if="option.img" :src="option.img" alt="" class="w-5 h-5 inline-block mr-2 align-middle">
                      {{ option[optionKey] }}
                      <LockClosedIcon v-if="option.is_locked" class="size-4 shrink-0 text-slate-400" aria-hidden="true" />
                    </span>
                  </SelectItemText>
                  <SelectItemIndicator />
                </slot>
              </SelectItem>

              <SelectItem
                v-if="hasExtraOption"
                :value="extraOptionValue"
                :text-value="extraOption?.name ?? ''"
                class="sticky bottom-0 bg-white border-t border-slate-200 px-2 outline-hidden cursor-pointer select-none py-2 pl-4 pr-4 hover:bg-[#71685f]/50 data-[highlighted]:bg-blue-50 text-black dark:text-slate-100"
                @select="handleExtraOptionSelect"
              >
                <SelectItemText>
                  <span class="block truncate">{{ extraOption?.name }}</span>
                </SelectItemText>
              </SelectItem>
            </SelectViewport>
          </SelectContent>
          </div>
        </component>
      </div>
    </SelectRoot>

    <p v-if="errorMessage" class="absolute pt-1 font-medium text-xs text-red-600 dark:text-red-400">
      {{ errorMessage }}
    </p>
  </div>
</template>