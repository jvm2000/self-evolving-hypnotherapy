// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: [
    '~/assets/css/main.css'
  ],
  runtimeConfig: {
    // Private (server-only). Overridden by NUXT_* env vars automatically.
    gmailUser: '',
    gmailAppPassword: '',
    mailFromName: 'Self Evolving Hypnotherapy Support',
    mailTo: ''
  },
})