<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <section class="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat mt-4" style="background-image:url(/illustrations/services-couch.jpg)">
    <div class="absolute inset-0 bg-[#f3e9df]/60 z-0"></div>

    <div class="flex flex-col items-center space-y-5 z-10">
      <p class="text-sm font-montserrat uppercase text-[#83684f] tracking-widest">S e r v i c e s</p>

      <p class="text-7xl font-garamond text-black tracking-wide pt-6">Gentle therapies for</p>

      <p class="text-7xl font-alexBrush text-[#b07750] font-extralight">lasting transformation</p>

      <div class="w-24 h-[1px] bg-[#b07750]" />

      <p class="text-lg text-gray-800 text-center font-montserrat">
        Every session is a safe, compassionate space to release what no longer serves,<br> reconnect with your true self, and evolve into the life you were always meant to live.
      </p>

      <div class="flex items-center gap-6 pt-6">
        <p class="text-sm font-montserrat uppercase text-[#83684f] tracking-widest">R e l e a s e</p>
        <p class="text-sm font-montserrat uppercase text-[#83684f]">.</p>
        <p class="text-sm font-montserrat uppercase text-[#83684f] tracking-widest">R e c o n n e c t</p>
        <p class="text-sm font-montserrat uppercase text-[#83684f]">.</p>
        <p class="text-sm font-montserrat uppercase text-[#83684f] tracking-widest">E v o l v e</p>
      </div>
    </div>
  </section>

  <section class="relative w-full my-24">
    <div class="max-w-5xl w-full mx-auto space-y-24 flex flex-col items-center">
      <BaseServicesContainer
        index="01"
        label="Hypnotherapy"
        description="Release what no longer serves. Reconnect with your inner strength. Evolve into the life you deserve."
        :contents="[
          'Hypnotherapy is a gentle yet deeply transformative therapy that works with the subconscious mind — the place where our beliefs, habits, emotions and automatic behaviours are stored. While in a deeply relaxed state, you remain aware and in complete control as your mind becomes more open to positive change.',
          'By working directly with the subconscious, hypnotherapy helps uncover and release the root cause of limiting beliefs and unwanted patterns rather than simply managing the symptoms. Whether you\'re struggling with anxiety, stress, fears, unwanted habits, confidence, weight management or emotional overwhelm, hypnotherapy creates the opportunity for lasting change from within.',
          'Every session is personalised because every person\'s journey is unique. My role is to guide you safely while your own mind does the incredible work it was designed to do — heal, adapt and grow.'
        ]"
      />

      <p class="text-sm text-[#d39b6e]">&#9670;</p>

      <BaseServicesContainer
        index="02"
        label="Emotional Freedom Techniques (EFT)"
        description="Sometimes healing begins with simply letting go."
        :contents="[
          'Emotional Freedom Techniques (EFT), commonly known as tapping, is a gentle mind-body therapy that helps calm the nervous system while releasing stored emotional stress. By lightly tapping on specific acupressure points while focusing on thoughts, emotions or memories, EFT helps reduce the emotional charge attached to experiences that may be keeping you stuck.',
          'Many clients describe feeling lighter, calmer and more emotionally balanced after tapping. EFT can be incredibly effective for anxiety, stress, fears, self-doubt, overwhelm, trauma, cravings and emotional blocks.',
          'It is also a wonderful self-care tool, giving you practical techniques you can continue using long after your sessions have finished.'
        ]"
      />

      <p class="text-sm text-[#d39b6e]">&#9670;</p>

      <BaseServicesContainer
        index="03"
        label="Neuro-Linguistic Programming (NLP)"
        description="Change your thinking. Change your patterns. Change your life."
        :contents="[
          'Our minds are constantly creating patterns — many of them helpful, and some that quietly keep us feeling stuck. Neuro-Linguistic Programming (NLP) helps identify these unconscious patterns and gently replace them with healthier, more empowering ways of thinking and responding.',
          'NLP focuses on the connection between your thoughts, language, emotions and behaviours. By changing the way your mind processes experiences, you can develop greater confidence, reduce anxiety, improve communication, overcome fears, increase motivation and create meaningful change in both your personal and professional life.',
          'Rather than dwelling on the past, NLP equips you with practical tools to create the future you want.'
        ]"
      />

      <p class="text-sm text-[#d39b6e]">&#9670;</p>

      <BaseServicesContainer
        index="04"
        label="Gestalt Therapy"
        description="Healing happens when every part of you feels seen, heard and accepted."
        :contents="[
          'Gestalt Therapy is a powerful approach that encourages self-awareness, emotional healing and personal growth by helping you connect with what is happening in the present moment.',
          'Often, unresolved emotions or unfinished experiences quietly influence our relationships, decisions and sense of self. Gestalt Therapy gently brings these experiences into awareness, allowing you to process them safely and with compassion.',
          'As you reconnect with yourself, you begin to understand old patterns, release emotional burdens and move forward with greater clarity, confidence and self-acceptance. It is about becoming whole — not by changing who you are, but by embracing every part of yourself.'
        ]"
      />

      <p class="text-sm text-[#d39b6e]">&#9670;</p>

      <BaseServicesContainer
        index="05"
        label="Eye Movement Desensitisation and Reprocessing (EMDR)"
        description="Your past may have shaped you, but it doesn't have to define you."
        :contents="[
          'EMDR (Eye Movement Desensitisation and Reprocessing) is a highly effective, evidence-based therapy that helps the brain naturally process distressing experiences that may still be affecting your daily life.',
          'Sometimes difficult memories become &quot;stuck,&quot; leaving us feeling anxious, overwhelmed, triggered or held back by experiences we thought we\'d moved on from. Using gentle bilateral stimulation — such as guided eye movements or tapping — EMDR supports the brain in safely reprocessing these memories so they lose their emotional intensity.',
          'As healing takes place, many clients notice they feel calmer, more resilient and free from the emotional weight they have been carrying. EMDR can be beneficial for trauma, anxiety, grief, phobias, low self-worth, PTSD and many other emotional challenges, helping you move forward with greater confidence and peace.'
        ]"
      />
    </div>
  </section>
</template>