import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        sm: "20px",
        md: "44px",
        lg: "112px",
        xl: "140px",
        "2xl": "168px",
      },
    },
  },
  plugins: [],
} satisfies Config;
