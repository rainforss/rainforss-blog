/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Fira Code", ...fontFamily.sans],
    },
  },
  darkMode: "class",
  variants: ["dark"],
  plugins: [require("@tailwindcss/line-clamp")],
  mode: "jit",
};
