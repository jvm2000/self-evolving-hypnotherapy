<script setup lang="ts">
interface MenuItem {
  label: string
  to: string
}

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const route = useRoute()
const items: MenuItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

function closeMenu() {
  emit('close')
}

function isActive(to: string) {
  return route.path === to
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
        @click="closeMenu"
      />
    </Transition>

    <Transition name="slide">
      <aside
        v-if="open"
        class="fixed top-0 right-0 z-50 flex h-screen w-[85%] max-w-sm flex-col bg-[#f3eae4] shadow-2xl"
      >
        <p class="text-sm text-gray-900 px-5 py-5 font-montserrat font-medium">Menu</p>

        <!-- Menu -->
        <nav class="flex-1 overflow-y-auto px-3 py-5">
          <ul class="space-y-1">
            <li
              v-for="item in items"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                class="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 font-montserrat"
                :class="
                  isActive(item.to)
                    ? 'text-[#987958] underline'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                "
                @click="closeMenu"
              >
                <span>{{ item.label }}</span>
              </NuxtLink>
            </li>
          </ul>

          <button class="bg-[#93907f] py-2.5 px-8 rounded-lg text-sm text-white uppercase font-montserrat w-full mt-8">Book a session</button>
        </nav>
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