// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: [
    '~/assets/css/main.css'
  ],
  runtimeConfig: {
    gmailUser: process.env.GMAIL_USER,
    gmailAppPassword: process.env.GMAIL_APP_PASSWORD,
    bookingEmail: process.env.BOOKING_EMAIL,
  },
})