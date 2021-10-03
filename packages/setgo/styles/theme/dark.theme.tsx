import {
  BRAND_ACCENT_HUE,
  BRAND_ACCENT_LIGHTNESS,
  BRAND_ACCENT_SATURATION,
  BRAND_PRIMARY_HUE,
  BRAND_PRIMARY_LIGHTNESS,
  BRAND_PRIMARY_SATURATION,
  hsl,
  Theme,
} from './theme';

export const darkTheme: Theme = {
  isDark: true,
  color: {
    primary: {
      default: hsl(
        BRAND_PRIMARY_HUE,
        BRAND_PRIMARY_SATURATION - 33,
        BRAND_PRIMARY_LIGHTNESS
      ),
      dark: hsl(
        BRAND_PRIMARY_HUE,
        BRAND_PRIMARY_SATURATION - 33,
        BRAND_PRIMARY_LIGHTNESS - 15
      ),
      light: hsl(
        BRAND_PRIMARY_HUE,
        BRAND_PRIMARY_SATURATION - 33,
        BRAND_PRIMARY_LIGHTNESS + 15
      ),
    },
    accent: {
      default: hsl(
        BRAND_ACCENT_HUE,
        BRAND_ACCENT_SATURATION - 15,
        BRAND_ACCENT_LIGHTNESS + 15
      ),
      dark: hsl(
        BRAND_ACCENT_HUE,
        BRAND_ACCENT_SATURATION - 33,
        BRAND_ACCENT_LIGHTNESS + 5
      ),
      light: hsl(
        BRAND_ACCENT_HUE,
        BRAND_ACCENT_SATURATION - 33,
        BRAND_ACCENT_LIGHTNESS + 25
      ),
    },
    text: {
      1: hsl(BRAND_PRIMARY_HUE, 15, 85),
      2: hsl(BRAND_PRIMARY_HUE, 5, 65),
    },
    surface: {
      1: hsl(BRAND_PRIMARY_HUE, 10, 12),
      2: hsl(BRAND_PRIMARY_HUE, 10, 15),
      3: hsl(BRAND_PRIMARY_HUE, 10, 17.5),
      4: hsl(BRAND_PRIMARY_HUE, 10, 20),
      5: hsl(BRAND_PRIMARY_HUE, 10, 25),
    },
    border: {
      default: 'hsla(0, 0%, 100%, 0.1)',
      light: '#fff',
    },
    error: '#cf6679',
    ripple: 'rgba(145, 145, 145, 0.1)',
  },
};
