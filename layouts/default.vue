<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/solid'

const route = useRoute()
const isMenuOpen = ref(false)
const isOpenBookSession = ref(false)
</script>

<template>
  <header class="flex items-center justify-between w-full py-6 px-6 sm:xl:py-2 md:px-20">
    <img src="/logo-header.png" alt="Logo Header" class="w-auto h-12" />

    <button class="block sm:hidden" @click="isMenuOpen = true">
      <Bars3Icon class="w-6 h-6 stroke-[#83684f]" />
    </button>

    <div class="hidden sm:flex items-center gap-20">
      <button @click="navigateTo('/')" class="flex flex-col items-center relative">
        <a class="uppercase font-montserrat text-[#83684f] font-medium text-sm">Home</a>
        <div v-if="route.path === '/'" class="w-full h-[1px] bg-[#bbb7ab] absolute -bottom-3"></div>
      </button>

      <button @click="navigateTo('about')" class="flex flex-col items-center relative">
        <a class="uppercase font-montserrat text-[#83684f] font-medium text-sm">About</a>
        <div v-if="route.path === '/about'" class="w-full h-[1px] bg-[#bbb7ab] absolute -bottom-3"></div>
      </button>

      <button @click="navigateTo('services')" class="flex flex-col items-center relative">
        <a class="uppercase font-montserrat text-[#83684f] font-medium text-sm">Services</a>
        <div v-if="route.path === '/services'" class="w-full h-[1px] bg-[#bbb7ab] absolute -bottom-3"></div>
      </button>

      <button @click="navigateTo('faq')" class="flex flex-col items-center relative">
        <a class="uppercase font-montserrat text-[#83684f] font-medium text-sm">Faq</a>
        <div v-if="route.path === '/faq'" class="w-full h-[1px] bg-[#bbb7ab] absolute -bottom-3"></div>
      </button>

      <button @click="navigateTo('contact')" class="flex flex-col items-center relative">
        <a class="uppercase font-montserrat text-[#83684f] font-medium text-sm">Contact</a>
        <div v-if="route.path === '/contact'" class="w-full h-[1px] bg-[#bbb7ab] absolute -bottom-3"></div>
      </button>

      <button @click="isOpenBookSession = true" class="bg-[#93907f] py-2.5 px-8 rounded-lg text-sm text-white uppercase font-montserrat hidden lg:block">Book a session</button>
    </div>
  </header>

  <div class="overflow-x-hidden">
    <slot />
  </div>

  <footer v-if="route.path !== '/'" class="w-full border-t border-orange-200/50 overflow-x-hidden">
    <div class="mx-auto flex flex-col items-center space-y-2 py-8">
      <p class="text-2xl font-alexBrush text-[#b07750] font-extralight">Self Evolving Hypnotherapy</p>
      
      <div class="flex items-center gap-4">
        <p class="text-xs font-montserrat uppercase text-black tracking-widest">R E L E A S E</p>
        <div class="w-[3px] h-[3px] bg-[#8a7058] rounded-full"></div>
        <p class="text-xs font-montserrat uppercase text-black tracking-widest">R E C O N N E C T</p>
        <div class="w-[3px] h-[3px] bg-[#8a7058] rounded-full"></div>
        <p class="text-xs font-montserrat uppercase text-black tracking-widest">E V O L V E</p>
      </div>
    </div>
  </footer>

  <BaseMobileMenu
    :open="isMenuOpen"
    @close="isMenuOpen = false"
  />

  <BookSession
    :open="isOpenBookSession"
    @close="isOpenBookSession = false"
  />
</template>

<style>
body {
  font-family: "Inter", sans-serif;
  background: #f3eae4; 
}
</style>
