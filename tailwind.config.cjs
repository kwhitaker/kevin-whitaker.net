/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        "crt-screen": {
          light: "#ebf1fd",
          DEFAULT: "#dde8fd",
          dark: "##bdd4ff",
        },
        "crt-text": {
          light: "#6b6bdf",
          DEFAULT: "#4242C6",
          dark: "#3232aa",
        },
      },
      fontFamily: {
        display: ["VT323", "monospace"],
      },
    },
  },
};
