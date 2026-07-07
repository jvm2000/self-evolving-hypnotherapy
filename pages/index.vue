<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="w-full relative">
    <div class="w-full h-[48rem] relative pb-8">
      <img src="/couch2.png" alt="Couch Header" class="w-full h-full absolute object-cover z-0" />

      <div class="left-0 absolute w-full grid grid-cols-5 h-[48rem] z-10">
        <div class="col-span-2 px-24 flex flex-col items-center w-full">
          <div class="flex flex-col items-center space-y-1.5">
            <img src="/logo-header.png" alt="Logo Header" class="w-auto h-64" />

            <p class="text-6xl font-garamond text-[#8a7058] uppercase tracking-widest">Self Evolving</p>

            <div class="flex items-center justify-between px-2 gap-4 w-full">
              <div class="bg-[#8a7058] w-28 h-[1px]"></div>
              <p class="text-[#8a7058] font-montserrat text-2xl uppercase tracking-widest">Hypnotherapy</p>
              <div class="bg-[#8a7058] w-28 h-[1px]"></div>
            </div>

            <div class="font-alexBrush text-[#8a7058] tracking-widest flex items-center gap-2">
              <p class="text-3xl">with</p> 
              <p class="text-4xl">Sue-Ellen</p>
            </div>

            <HeartIcon class="w-5 h-5 fill-[#b5b0a1]" />

            <div class="flex items-center gap-5">
              <p class="text-sm text-[#8a7058] uppercase font-montserrat font-medium tracking-widest">Release</p>
              <div class="w-[3px] h-[3px] bg-[#8a7058] rounded-full"></div>
              <p class="text-sm text-[#8a7058] uppercase font-montserrat font-medium tracking-widest">Reconnect</p>
              <div class="w-[3px] h-[3px] bg-[#8a7058] rounded-full"></div>
              <p class="text-sm text-[#8a7058] uppercase font-montserrat font-medium tracking-widest">Evolve</p>
            </div>

            <p class="text-5xl font-garamond text-[#8a7058] tracking-wide pt-6">Transform Your Mind</p>

            <p class="text-5xl font-alexBrush text-[#908c7a] font-extralight">Elevate Your Life</p>

            <p class="text-sm font-montserrat text-[#8a7058] text-center px-4 pt-4">
              Compassionate hypnotherapy to help you release what no longer serves you, reconnect with your true self, and evolve into the life you were always meant to live.
            </p>

            <div class="pt-4">
              <button class="bg-[#93907f] py-2.5 px-8 rounded-lg text-sm text-white uppercase font-montserrat">Book a session</button>
            </div>
          </div>

        </div>
 
        <div class="col-span-3"></div>
      </div>

      <div class="left-0 top-0 bg-[linear-gradient(to_bottom,#f3eae4_10%,#f3eae4_1%,transparent_100%)] w-full h-36 absolute z-0"></div>
    </div>

    <div class="px-28 py-8 flex flex-col items-center w-full bg-[#eee6e1] space-y-6">
      <p class="text-[#83806f] font-montserrat text-lg uppercase tracking-widest">How Hypnotherapy Can Help You</p>

      <div class="grid grid-cols-4 gap-0 divide-x divide-[#dcd3cc]">
        <BaseHypnoteraphy 
          label="Release" 
          description="Let go of limiting beliefs, stress, anxiety and emotional blocks."
        >
          <img src="/icons/home/leave.png" class="w-12 h-12 stroke-[#8a7058]" />
        </BaseHypnoteraphy>

        <BaseHypnoteraphy 
          label="Reconnect" 
          description="Reconnect with your inner self, your values and what truely matters."
        >
          <img src="/icons/home/heart.png" class="w-11 h-11 stroke-[#8a7058]" />
        </BaseHypnoteraphy>

        <BaseHypnoteraphy 
          label="Evolve" 
          description="Step into your power and create the life you desire."
        >
          <img src="/icons/home/leaves.png" class="w-12 h-12 stroke-[#8a7058]" />
        </BaseHypnoteraphy>

        <BaseHypnoteraphy 
          label="Empower" 
          description="Build confidence, clarity and a positive mindset for lasting change."
        >
          <img src="/icons/home/star.png" class="w-14 h-14 stroke-[#8a7058]" />
        </BaseHypnoteraphy>
      </div>
    </div>

    <div class="py-4 flex flex-col items-center w-full bg-[#949282]">
      <div class="flex items-center gap-6">
        <p class="text-2xl text-white font-alexBrush font-light">You have the power within you</p>
        <HeartIcon class="w-5 h-5 fill-white" />
        <p class="text-2xl text-white font-alexBrush font-light">Let's unlock it together.</p>
      </div>
    </div>
  </div>
</template>