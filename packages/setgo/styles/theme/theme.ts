export interface Theme {
  isDark: boolean;
  color: {
    primary: {
      default: string;
      dark: string;
      light: string;
    };
    accent: {
      default: string;
      dark: string;
      light: string;
    };
    text: {
      1: string;
      2: string;
    };
    surface: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
    };
    border: {
      default: string;
      light: string;
    };
    error: string;
    ripple: string;
  };
}

export const BRAND_PRIMARY_HUE = 215;
export const BRAND_PRIMARY_SATURATION = 100;
export const BRAND_PRIMARY_LIGHTNESS = 50;

export const BRAND_ACCENT_HUE = 20;
export const BRAND_ACCENT_SATURATION = 100;
export const BRAND_ACCENT_LIGHTNESS = 50;

export const hsl = (hue: number, saturation: number, lightness: number) =>
  `hsl(${hue} ${saturation}% ${lightness}%)`;
