module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
    extend: {
      boxShadow: {
        xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
