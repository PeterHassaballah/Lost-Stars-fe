import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0b1220',
        elevated: '#101a2d',
        accent: '#8b5cf6',
        accentSoft: '#4c1d95'
      },
      fontSize: {
        'body-sm': ['0.9375rem', { lineHeight: '1.5rem' }],
        'body-base': ['1rem', { lineHeight: '1.75rem' }]
      }
    }
  },
  plugins: []
};

export default config;
