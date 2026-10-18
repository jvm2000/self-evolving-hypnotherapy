<script setup lang="ts">
import { EnvelopeIcon, MapPinIcon, PaperAirplaneIcon, PhoneIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <section class="relative pt-4">
    <div class="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat" style="background-image:url(/illustrations/contact-couch.jpg)">
      <div class="absolute inset-0 bg-[#f3e9df]/60 z-0"></div>

      <div class="flex flex-col items-center space-y-3 z-10">
        <p class="text-xs sm:text-sm font-montserrat uppercase text-[#83684f] tracking-widest">C O N T A C T</p>

        <p class="text-5xl sm:text-8xl font-alexBrush font-extrabold text-[#83684f] tracking-wide pt-6">Let's</p>

        <p class="text-5xl sm:text-7xl font-alexBrush text-[#b07750] font-extralight">Connect</p>

        <div class="w-24 h-[1px] bg-[#b07750]" />

        <p class="text-sm sm:text-lg text-gray-800 text-center font-montserrat px-6 sm:px-0 max-w-2xl w-full">
          Taking the first step is often the hardest. I'd love to hear from you — reach out for a friendly, no-obligation conversation.
        </p>

        <div class="flex items-center gap-2 sm:gap-6 pt-6">
          <p class="text-xs sm:text-sm font-montserrat uppercase text-[#83684f] tracking-widest">R e l e a s e</p>
          <p class="text-xs sm:text-sm font-montserrat uppercase text-[#83684f]">.</p>
          <p class="text-xs sm:text-sm font-montserrat uppercase text-[#83684f] tracking-widest">R e c o n n e c t</p>
          <p class="text-xs sm:text-sm font-montserrat uppercase text-[#83684f]">.</p>
          <p class="text-xs sm:text-sm font-montserrat uppercase text-[#83684f] tracking-widest">E v o l v e</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center w-full pt-44 pb-24">
      <div class="grid grid-cols-1 lg:grid-cols-5 items-start max-w-6xl w-full gap-16 px-6 lg:px-0">
        <div class="flex flex-col items-start col-span-2 gap-10">
          <div class="flex flex-col items-start gap-3.5">
            <p class="text-3xl font-alexBrush text-[#b07750] font-extralight">Get in touch</p>

            <p class="text-3xl font-garamond text-black tracking-wide">I'm here to listen</p>

            <p class="text-base font-light font-montserrat text-black">
              Send a message and I'll get back to you as soon as I can.
            </p>
          </div>

          <div class="flex flex-col items-start gap-3.5">
            <div class="w-full flex flex-col items-start gap-6">
              <div class="flex items-center gap-4 whitespace-nowrap">
                <div class="w-10 h-10 border border-[#b07750]/50 rounded-full grid place-items-center">
                  <EnvelopeIcon class="w-5 h-5 stroke-[#b07750]" />
                </div>
                
                <div class="flex flex-col items-start">
                  <p class="text-sm font-light font-montserrat text-black tracking-widest uppercase">Email</p>
                  <p class="text-base font-light font-montserrat text-black">info@selfevolvinghypnotherapy.com</p>
                </div>
              </div>

              <div class="flex items-center gap-4 whitespace-nowrap">
                <div class="w-10 h-10 border border-[#b07750]/50 rounded-full grid place-items-center">
                  <MapPinIcon class="w-5 h-5 stroke-[#b07750]" />
                </div>
                
                <div class="flex flex-col items-start">
                  <p class="text-sm font-light font-montserrat text-black tracking-widest uppercase">LOCATION</p>
                  <p class="text-base font-light font-montserrat text-black">In-person & online sessions</p>
                </div>
              </div>

              <div class="flex items-center gap-4 whitespace-nowrap">
                <div class="w-10 h-10 border border-[#b07750]/50 rounded-full grid place-items-center">
                  <PhoneIcon class="w-5 h-5 stroke-[#b07750]" />
                </div>
                
                <div class="flex flex-col items-start">
                  <p class="text-sm font-light font-montserrat text-black tracking-widest uppercase">Phone</p>
                  <p class="text-base font-light font-montserrat text-black">0494695465</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-3 bg-[#fdfaf4] rounded-lg w-full p-8 border border-[#b07750]/20 shadow-sm">
          <div class="grid grid-cols-2 sm:xl:grid-cols-2 gap-6">
            <div class="col-span-2 sm:xl:col-span-1">
              <BaseInput label="Full Name" placeholder="Enter your full name" />
            </div>  
            <div class="col-span-2 sm:xl:col-span-1">
              <BaseInput label="Email Address" placeholder="Enter your email address" />
            </div>

            <div class="col-span-2">
              <BaseInput label="Phone Number" placeholder="Enter your phone number" />
            </div>

            <div class="col-span-2">
              <BaseTextArea
                label="MESSAGE"
                placeholder="Tell us anything we should know..."
              />
            </div>
          </div>
          
          <div class="flex justify-start">
            <button class="bg-[#b07750] py-2.5 px-8 rounded-lg text-sm text-white uppercase font-montserrat mt-6 flex items-center">
              <PaperAirplaneIcon class="w-5 h-5 inline mr-2 -rotate-45" />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>