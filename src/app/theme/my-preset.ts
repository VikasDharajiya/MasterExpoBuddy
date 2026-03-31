import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eff6ff', // very light background, e.g., cards, table row hover, subtle surfaces
      100: '#dbeafe', // light surfaces, disabled input backgrounds
      200: '#bfdbfe', // slightly stronger background, e.g., alternate table rows
      300: '#93c5fd', // light hover states, secondary accents
      400: '#60a5fa', // medium hover, badges, small highlights
      500: '#006DFF', // MAIN color → default button background, primary links
      600: '#2563eb', // hover state for buttons, links, active elements
      700: '#1d4ed8', // active / pressed button states, focus outlines
      800: '#1e40af', // dark borders, icons on light backgrounds
      900: '#1e3a8a', // very dark text, strong emphasis, headings
    },
  },
});
