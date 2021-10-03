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

export const lightTheme: Theme = {
  isDark: false,
  color: {
    primary: {
      default: hsl(
        BRAND_PRIMARY_HUE,
        BRAND_PRIMARY_SATURATION,
        BRAND_PRIMARY_LIGHTNESS
      ),
      dark: hsl(
        BRAND_PRIMARY_HUE,
        BRAND_PRIMARY_SATURATION,
        BRAND_PRIMARY_LIGHTNESS - 20
      ),
      light: hsl(
        BRAND_PRIMARY_HUE,
        BRAND_PRIMARY_SATURATION,
        BRAND_PRIMARY_LIGHTNESS + 25
      ),
    },
    accent: {
      default: hsl(
        BRAND_ACCENT_HUE,
        BRAND_ACCENT_SATURATION,
        BRAND_ACCENT_LIGHTNESS
      ),
      dark: hsl(
        BRAND_ACCENT_HUE,
        BRAND_ACCENT_SATURATION,
        BRAND_ACCENT_LIGHTNESS - 20
      ),
      light: hsl(
        BRAND_ACCENT_HUE,
        BRAND_ACCENT_SATURATION,
        BRAND_ACCENT_LIGHTNESS + 25
      ),
    },
    text: {
      1: hsl(BRAND_PRIMARY_HUE, BRAND_PRIMARY_SATURATION, 10),
      2: hsl(BRAND_PRIMARY_HUE, 10, 30),
    },
    surface: {
      1: hsl(BRAND_PRIMARY_HUE, 25, 85),
      2: hsl(BRAND_PRIMARY_HUE, 30, 95),
      3: hsl(BRAND_PRIMARY_HUE, 25, 97.5),
      4: hsl(BRAND_PRIMARY_HUE, 100, 100),
      5: hsl(BRAND_PRIMARY_HUE, 0, 100),
    },
    border: {
      default: 'rgba(0, 0, 0, 0.12)',
      light: 'rgba(0, 0, 0, 0.87)',
    },
    error: '#b00020',
    ripple: 'rgba(155, 155, 155, 0.1)',
  },
};
