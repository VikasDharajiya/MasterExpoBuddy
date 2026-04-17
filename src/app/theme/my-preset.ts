import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: 'var(--primary-50)', // very light background, e.g., cards, table row hover, subtle surfaces
      100: 'var(--primary-100)', // light surfaces, disabled input backgrounds
      200: 'var(--primary-200)', // slightly stronger background, e.g., alternate table rows
      300: 'var(--primary-300)', // light hover states, secondary accents
      400: 'var(--primary-400)', // medium hover, badges, small highlights
      500: 'var(--primary-500)', // MAIN color → default button background, primary links
      600: 'var(--primary-600)', // hover state for buttons, links, active elements
      700: 'var(--primary-700)', // active / pressed button states, focus outlines
      800: 'var(--primary-800)', // dark borders, icons on light backgrounds
      900: 'var(--primary-900)', // very dark text, strong emphasis, headings
    },
  },
});
