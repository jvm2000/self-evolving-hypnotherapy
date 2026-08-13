<script setup lang="ts">
const faqs = [
  {
    label: 'What is hypnotherapy?',
    description:
      'Hypnotherapy is a gentle, evidence-informed therapeutic approach that works with the subconscious mind to help create positive and lasting change. It can assist with changing unwanted habits, reducing anxiety and stress, overcoming fears, improving confidence and supporting emotional wellbeing. During hypnosis, you remain aware, relaxed and in control throughout the entire session.',
  },
  {
    label: 'Will I lose control during hypnosis?',
    description:
      'No. This is one of the biggest misconceptions about hypnosis. You cannot be made to do anything against your values or wishes. You remain aware of what is happening, can speak if you choose, and are free to end the session at any time. Hypnosis is a natural state of focused relaxation, similar to becoming completely absorbed in a good book or movie.',
  },
  {
    label: 'Can everyone be hypnotised?',
    description:
      'Most people who are willing to participate and follow the process can experience hypnosis. Everyone experiences it a little differently, and there is no "right" way to feel. The more open and engaged you are, the more beneficial your experience is likely to be.',
  },
  {
    label: 'What does hypnosis feel like?',
    description:
      'Most people describe hypnosis as feeling deeply relaxed, calm and peaceful. Some people feel light, others feel heavy, and some experience a pleasant sense of drifting while remaining aware of everything being said. Every experience is unique, but most clients leave feeling refreshed and relaxed.',
  },
  {
    label: 'How many sessions will I need?',
    description:
      "Every person and every situation is different. Some clients notice significant changes after just one session, while others benefit from a series of sessions depending on their goals and the complexity of the issue. During your initial consultation, we'll discuss your goals and develop a personalised plan that best supports your journey.",
  },
  {
    label: 'What can hypnotherapy help with?',
    description: `
      Hypnotherapy may assist with:
      • Anxiety and stress
      • Confidence and self-esteem
      • Fears and phobias
      • Smoking cessation
      • Weight management and emotional eating
      • Sleep difficulties
      • Motivation and performance
      • Emotional healing
      • Grief and loss
      • Habits and unwanted behaviours
      • Trauma support (using appropriate therapeutic approaches)
      • Personal growth and mindset

      If you're unsure whether hypnotherapy is suitable for your situation, please get in touch for a confidential chat.`,
  },
  {
    label: 'What happens during my first session?',
    description:
      "Your first appointment begins with a conversation about your goals, challenges and what you would like to achieve. This gives us the opportunity to understand your unique circumstances and tailor the session specifically to you. You'll then be gently guided into hypnosis using a relaxing process, followed by therapeutic work designed to help create positive change.",
  },
  {
    label: 'Is everything I share confidential?',
    description:
      'Absolutely. Your privacy is extremely important. Everything discussed during your sessions is kept strictly confidential in accordance with professional and ethical standards, except where disclosure is required by law.',
  },
  {
    label: 'Do you offer online sessions?',
    description:
      'Yes. Sessions can be conducted online from the comfort of your own home, allowing you to experience the same gentle and effective therapeutic process wherever you are. All you need is a quiet, comfortable space and a reliable internet connection.',
  },
  {
    label: 'What if I’m nervous?',
    description:
      "Feeling nervous before your first appointment is completely normal. Many clients have never experienced hypnotherapy before and are unsure what to expect. My role is to create a safe, supportive and non-judgemental environment where you can relax at your own pace. I'll explain each step of the process so you always know what to expect.",
  },
  {
    label: 'Is hypnotherapy backed by research?',
    description:
      'Yes. There is growing scientific research supporting the use of hypnotherapy for a range of concerns, including anxiety, pain management, IBS, smoking cessation and certain behavioural changes. Hypnotherapy is most effective when used as part of a personalised therapeutic approach tailored to your individual needs.',
  },
  {
    label: 'Are your services a replacement for medical or psychological treatment?',
    description:
      'No. Hypnotherapy is a complementary therapy and is not intended to diagnose, treat or cure medical or mental health conditions. If you are under the care of a doctor, psychologist or other healthcare professional, hypnotherapy can often work alongside their treatment. You should always continue following the advice of your healthcare providers.',
  },
  {
    label: 'How do I book an appointment?',
    description:
      "Booking is easy. Simply call, email or use the contact form on the website to arrange your appointment. If you're unsure whether hypnotherapy is right for you, I'm happy to have a friendly, no-obligation conversation to answer your questions before you book.",
  },
  {
    label: 'Is hypnotherapy covered by private health funds?',
    description:
      'Depending on your health fund, you may have the opportunity to get a rebate back on your session. Please note that not all health funds cover hypnotherapy and this is not something that we can assist with, please check with your provider. A receipt will be provided upon payment, which you can use to make a claim, if your insurance company covers hypnotherapy. Unfortunately, more often than not there is no cover.',
  }
]
</script>

<template>
  <section class="relative py-24">
    <div class="mx-auto flex flex-col items-center gap-4">
      <p class="text-sm font-montserrat uppercase text-[#83684f] tracking-widest">F R E Q U E N T L Y   A S K E D</p>

      <p class="text-7xl font-garamond text-black tracking-wide pt-6">Your questions,</p>

      <div class="w-full flex flex-col items-center space-y-8">
        <p class="text-7xl font-alexBrush text-[#b07750] font-extralight">gently answered</p>

        <div class="w-24 h-[1px] bg-[#b07750]"></div>
      </div>
    </div>

    <div class="pt-24 flex flex-col space-y-6 w-full max-w-4xl mx-auto">
      <div v-for="f in faqs" class="flex flex-col space-y-8 border-b border-orange-200/50 pb-8 group">
        <p class="text-2xl font-garamond group-hover:underline text-[#b07750]">{{ f.label }}</p>

        <p class="text-base font-light font-montserrat text-black">
          {{ f.description }}
        </p>
      </div>
    </div>
  </section>
</template>