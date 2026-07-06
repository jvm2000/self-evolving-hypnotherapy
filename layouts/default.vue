<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <header class="flex items-center justify-between w-full pt-2 px-20">
    <img src="/logo-header.png" alt="Logo Header" class="w-auto h-24" />

    <div class="flex items-center gap-20">
      <button class="flex flex-col items-center relative">
        <a class="uppercase font-montserrat text-[#83684f] font-medium text-sm">Home</a>
        <div v-if="route.path === '/'" class="w-full h-[1px] bg-[#bbb7ab] absolute -bottom-3"></div>
      </button>

      <button class="flex flex-col items-center relative">
        <a class="uppercase font-montserrat text-[#83684f] font-medium text-sm">About Us</a>
        <div v-if="route.path === '/about'" class="w-full h-[1px] bg-[#bbb7ab] absolute -bottom-3"></div>
      </button>

      <button class="flex flex-col items-center relative">
        <a class="uppercase font-montserrat text-[#83684f] font-medium text-sm">Contact</a>
        <div v-if="route.path === '/contact'" class="w-full h-[1px] bg-[#bbb7ab] absolute -bottom-3"></div>
      </button>

      <button class="bg-[#93907f] py-2.5 px-8 rounded-lg text-sm text-white uppercase font-montserrat">Book a session</button>
    </div>
  </header>

  <slot />
</template>

<style>
body {
  font-family: "Inter", sans-serif;
  background: #f3eae4; 
}
</style>
