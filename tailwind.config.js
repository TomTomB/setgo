module.exports = {
  mode: 'jit',
  purge: ['./apps/**/*.html', './libs/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#42ced5',
          light: '#7fffff',
          dark: '#009ca4',
        },
        secondary: {
          DEFAULT: '#e91e63',
          light: '#ff6090',
          dark: '#b0003a',
        },
        error: {
          light: '#b00020',
          dark: '#cf6679',
        },
        background: {
          light: '#fafafa',
          dark: '#303030',
        },
        toolbar: {
          light: '#f5f5f5',
          dark: '#212121',
        },
        card: {
          light: '#fff',
          dark: '#424242',
          'light-border': '#fdfdfd',
          'dark-border': '#383838',
        },
        footer: {
          light: '#ececec',
          dark: '#2b2b2b',
        },
        chip: {
          light: '#ececec',
          dark: '#5a5a5a',
        },
        border: {
          light: 'rgba(0, 0, 0, 0.12)',
          'light-hover': 'rgba(0, 0, 0, 0.87)',
          dark: 'hsla(0, 0%, 100%, 0.3)',
          'dark-hover': '#fff',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
