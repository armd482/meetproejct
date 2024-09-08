import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontSize: {
        '1.5xl': ['22px', '30px'],
        '4.5xl': ['44px', '1'],
      },
      fontFamily: {
        googleSans: ['Google Sans', 'Roboto', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'black-87': 'rgba(0, 0, 0, 0.87)',
      },
      backgroundColor: {
        'black-75': 'rgba(0, 0, 0, 0.75)',
      },
      keyframes: {
        'slide-in-left': {
          '0%': {
            transform: 'scaleX(0)',
          },
          '100%': {
            transform: 'scaleX(1)',
          },
        },

        'slide-out-left': {
          '0%': {
            transform: 'scaleX(1)',
          },
          '100%': {
            transform: 'scaleX(0)',
          },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.3s ease forwards',
        'slide-out-left': 'slide-out-left 0.3s ease forwards',
      },
      transformOrigin: {
        'top-right': '100% 0%',
      },
      screens: {
        'lg-max': { max: '1023px' },
      },
    },
  },
  plugins: [],
};
export default config;
