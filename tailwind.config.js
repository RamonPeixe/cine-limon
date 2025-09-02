// tailwind.config.js
import { palette } from "./src/theme/palette.ts";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brandSans: ["Inter", "ui-sans-serif", "system-ui", "Arial", "sans-serif"],
        brandSerif: ["Lora", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        bg:      palette.canvas,
        header:  palette.header,
        surface: palette.surface,
        card:    palette.card,
        border:  palette.border,
        divider: palette.divider,
        ink: {
          DEFAULT: palette.ink,
          soft:    palette.inkSoft,
        },
        leaf: {
          500: palette.leaf500,
          700: palette.leaf700,
        },
        lemon: { 500: palette.lemon500 },
        info:  palette.info,
        success: palette.success,
        warning: palette.warning,
        danger:  palette.danger,
      },
    },
  },
  plugins: [],
};
