import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        sm: { max: '480px' },
        'sm-md': { max: '600px' },
        md: { max: '800px' },
        lg: { max: '1023px' },
        xl: { max: '1279px' },
        '2xl': { max: '1535px' },
      },
      fontSize: {
        '1.5xl': ['22px', '30px'],
        '4.5xl': ['44px', '1'],
      },
      fontFamily: {
        googleSans: ['Google Sans', 'Google Sans Text', 'Roboto', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'black-87': 'rgba(0, 0, 0, 0.87)',
        'custom-gray': '#1F1F1F',
      },
      backgroundColor: {
        'black-75': 'rgba(0, 0, 0, 0.75)',
      },
      width: {
        'settingContent-md': 'calc(100vw - 112px)',
        'deviceSelectBox-sm': 'calc(100vw - 160px) !important',
        'deviceSelectBox-sm-md': 'calc(100vw - 320px)',
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

        'slide-in-bottom': {
          '0%': {
            transform: 'scaleY(0)',
          },
          '100%': {
            transform: 'scaleY(1)',
          },
        },

        'move-bottom-up': {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '1',
          },

          '70%': {
            transform: 'translateY(-355%)',
            opacity: '1',
          },
          '80%': {
            transform: 'translateY(-420%)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'translateY(-520%)',
            opacity: '0',
          },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.3s ease forwards',
        'slide-out-left': 'slide-out-left 0.3s ease forwards',
        'slide-in-bottom': 'slide-in-bottom 0.3s ease forwards',
        'move-bottom-up': 'move-bottom-up 3s linear forwards',
      },
      transformOrigin: {
        'top-right': '100% 0%',
      },
    },
  },
  plugins: [],
};
export default config;
