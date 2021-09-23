function guessProductionMode() {
  const argv = process.argv.join(' ').toLowerCase();
  const isProdEnv = process.env.NODE_ENV === 'production';
  return (
    isProdEnv ||
    [' build', ':build', 'ng b', '--prod'].some((command) =>
      argv.includes(command),
    )
  );
}

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

const BRAND_PRIMARY_HUE = 215;
const BRAND_PRIMARY_SATURATION = 100;
const BRAND_PRIMARY_LIGHTNESS = 50;

const BRAND_ACCENT_HUE = 20;
const BRAND_ACCENT_SATURATION = 100;
const BRAND_ACCENT_LIGHTNESS = 50;

const makeHsl = (hue, saturation, lightness) =>
  `hsl(${hue} ${saturation}% ${lightness}%)`;

module.exports = {
  mode: 'jit',
  purge: [
    './apps/**/*.html',
    './libs/**/*.html',
    './apps/**/*.component.ts',
    './libs/**/*.component.ts',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            light: {
              DEFAULT: makeHsl(
                BRAND_PRIMARY_HUE,
                BRAND_PRIMARY_SATURATION,
                BRAND_PRIMARY_LIGHTNESS,
              ),
              dark: makeHsl(
                BRAND_PRIMARY_HUE,
                BRAND_PRIMARY_SATURATION,
                BRAND_PRIMARY_LIGHTNESS - 20,
              ),
              light: makeHsl(
                BRAND_PRIMARY_HUE,
                BRAND_PRIMARY_SATURATION,
                BRAND_PRIMARY_LIGHTNESS + 25,
              ),
            },
            dark: {
              DEFAULT: makeHsl(
                BRAND_PRIMARY_HUE,
                BRAND_PRIMARY_SATURATION - 33,
                BRAND_PRIMARY_LIGHTNESS,
              ),
              dark: makeHsl(
                BRAND_PRIMARY_HUE,
                BRAND_PRIMARY_SATURATION - 33,
                BRAND_PRIMARY_LIGHTNESS - 15,
              ),
              light: makeHsl(
                BRAND_PRIMARY_HUE,
                BRAND_PRIMARY_SATURATION - 33,
                BRAND_PRIMARY_LIGHTNESS + 15,
              ),
            },
          },
          accent: {
            light: {
              DEFAULT: makeHsl(
                BRAND_ACCENT_HUE,
                BRAND_ACCENT_SATURATION,
                BRAND_ACCENT_LIGHTNESS,
              ),
              dark: makeHsl(
                BRAND_ACCENT_HUE,
                BRAND_ACCENT_SATURATION,
                BRAND_ACCENT_LIGHTNESS - 20,
              ),
              light: makeHsl(
                BRAND_ACCENT_HUE,
                BRAND_ACCENT_SATURATION,
                BRAND_ACCENT_LIGHTNESS + 25,
              ),
            },
            dark: {
              DEFAULT: makeHsl(
                BRAND_ACCENT_HUE,
                BRAND_ACCENT_SATURATION - 15,
                BRAND_ACCENT_LIGHTNESS + 15,
              ),
              dark: makeHsl(
                BRAND_ACCENT_HUE,
                BRAND_ACCENT_SATURATION - 33,
                BRAND_ACCENT_LIGHTNESS + 5,
              ),
              light: makeHsl(
                BRAND_ACCENT_HUE,
                BRAND_ACCENT_SATURATION - 33,
                BRAND_ACCENT_LIGHTNESS + 25,
              ),
            },
          },
        },
        surface: {
          light: {
            1: makeHsl(BRAND_PRIMARY_HUE, 25, 85),
            2: makeHsl(BRAND_PRIMARY_HUE, 30, 95),
            3: makeHsl(BRAND_PRIMARY_HUE, 25, 97.5),
            4: makeHsl(BRAND_PRIMARY_HUE, 100, 100),
            5: makeHsl(BRAND_PRIMARY_HUE, 0, 100),
          },
          dark: {
            1: makeHsl(BRAND_PRIMARY_HUE, 10, 12),
            2: makeHsl(BRAND_PRIMARY_HUE, 10, 15),
            3: makeHsl(BRAND_PRIMARY_HUE, 10, 17.5),
            4: makeHsl(BRAND_PRIMARY_HUE, 10, 20),
            5: makeHsl(BRAND_PRIMARY_HUE, 10, 25),
          },
        },
        text: {
          light: {
            1: makeHsl(BRAND_PRIMARY_HUE, BRAND_PRIMARY_SATURATION, 10),
            2: makeHsl(BRAND_PRIMARY_HUE, 10, 30),
          },
          dark: {
            1: makeHsl(BRAND_PRIMARY_HUE, 15, 85),
            2: makeHsl(BRAND_PRIMARY_HUE, 5, 65),
          },
        },
        error: {
          light: '#b00020',
          dark: '#cf6679',
        },
        border: {
          light: 'rgba(0, 0, 0, 0.12)',
          'light-hover': 'rgba(0, 0, 0, 0.87)',
          dark: 'hsla(0, 0%, 100%, 0.1)',
          'dark-hover': '#fff',
        },
        elements: {
          ripple: {
            light: 'rgba(155, 155, 155, 0.1)',
            dark: 'rgba(145, 145, 145, 0.1)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
