<script setup lang="ts">
const aboutContent = [
  {
    label: 'Safe & judgement-free',
    description:
      'Real change begins when you feel safe, understood and completely free from judgement. Every session is held with warmth, respect and unconditional acceptance.',
  }, {
    label: 'Gentle & personal',
    description:
      'My approach is gentle, compassionate and personal. We explore the thoughts, patterns or experiences that may be holding you back — always at your own pace.',
  }, {
    label: 'Rooted in lasting change',
    description:
      'Through hypnotherapy and supportive techniques, I help you connect with your subconscious mind, release what is no longer serving you, and create space for positive, lasting change.',
  },
]
</script>

<template>
  <section class="relative py-24">
    <div class="mx-auto flex flex-col items-center gap-4">
      <p class="text-xs sm:text-sm font-montserrat uppercase text-[#83684f] tracking-widest">A B O U T</p>

      <p class="text-5xl sm:text-7xl font-garamond text-black tracking-wide pt-6">Meet</p>

      <div class="w-full flex flex-col items-center space-y-8 px-6 lg:px-0">
        <p class="text-5xl sm:text-7xl font-alexBrush text-[#b07750] font-extralight">Sue‑Ellen</p>

        <div class="w-24 h-[1px] bg-[#b07750]"></div>

        <p class="text-base font-light font-montserrat text-black max-w-3xl text-center">
          I believe real change begins when you feel safe, understood and completely free from judgement.
        </p>

        <p class="text-3xl font-light font-garamond text-black max-w-3xl text-center py-16 leading-relaxed">
          “My purpose is to help you feel lighter, stronger and more connected to yourself, so you can move forward with greater confidence and live the life you truly deserve.”
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-8 lg:px-0 py-12">
      <div
        v-for="about in aboutContent"
        class="rounded-lg p-8 bg-[#fdfaf4] border border-[#ede0d3] flex flex-col items-center space-y-6 lg:h-96"
      >
        <div class="flex flex-col items-center space-y-3">
          <p class="font-garamond text-2xl text-black text-center">{{ about.label }}</p>

          <div class="w-12 h-[1px] bg-[#b07750]"></div>
        </div>

        <p class="text-base font-light font-montserrat text-black text-center leading-relaxed">
          {{ about.description }}
        </p>
      </div>
    </div>

    <div class="flex flex-col items-center space-y-6 py-8 px-6 lg:px-0">
      <p class="text-[#b07750] font-alexBrush text-4xl">A comfortable space to heal</p>

      <p class="text-base font-light font-montserrat text-black text-center leading-relaxed max-w-3xl">
        I create a comfortable space where you can openly explore the thoughts, patterns or experiences that may be holding you back. Through hypnotherapy and a range of supportive techniques, we work together to connect with your subconscious mind, release what is no longer serving you, and create space for positive, lasting change.
      </p>
    </div>

    <div class="rounded-lg p-14 bg-[#fdfaf4] border border-[#ede0d3] flex flex-col items-center space-y-6 max-w-3xl mx-auto my-20">
      <p class="text-[#b07750] font-alexBrush text-4xl">Ready to begin?</p>

      <p class="font-garamond text-2xl text-black text-center">
        Take the first step today
      </p>

      <p class="text-base font-light font-montserrat text-black text-center leading-relaxed max-w-xl">
        If my approach resonates with you, I'd love to hear from you. Let's have a friendly, no-obligation conversation about how I can support your journey.
      </p>

      <button @click="navigateTo('services')" class="bg-[#93907f] py-2.5 px-8 rounded-lg text-sm text-white uppercase font-montserrat">EXPLORE SERVICES</button>
    </div>
  </section>
</template>