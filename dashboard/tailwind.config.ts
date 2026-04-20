import type { Config } from "tailwindcss";
import { tokens } from "./cui/tokens";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./cui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: tokens.colors,
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize as any,
      fontWeight: tokens.typography.fontWeight as any,
      letterSpacing: tokens.typography.letterSpacing,
      lineHeight: tokens.typography.lineHeight,
      spacing: tokens.spacing as any,
      borderRadius: tokens.effects.borderRadius,
      boxShadow: tokens.effects.boxShadow,
      transitionProperty: tokens.effects.transition as any,
      transitionDuration: tokens.effects.duration,
      zIndex: tokens.effects.zIndex as any,
      maxWidth: tokens.containerMaxWidth,
    },
  },
  plugins: [],
};
export default config;
