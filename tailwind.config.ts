import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#1a3a2a',
        moss: '#2d5a3d',
        sage: '#4a7c59',
        leaf: '#6aad6e',
        lime: '#a8d87a',
        cream: '#f5f0e8',
        parchment: '#ede6d3',
        tan: '#c8b89a',
        earth: '#8b6f47',
        charcoal: '#1c1c1c',
        accent: '#d4a843',
      },
      boxShadow: {
        hero: '0 8px 25px rgba(168,216,122,0.3)',
      },
      animation: {
        fadeup: 'fadeUp 0.8s ease forwards',
        fadein: 'fadeIn 1.5s ease 1.2s forwards',
        pulsenav: 'pulse 2s infinite',
        scrollDrop: 'scrollDrop 1.5s ease infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        scrollDrop: {
          '0%': { transform: 'scaleY(0)', 'transform-origin': 'top' },
          '50%': { transform: 'scaleY(1)', 'transform-origin': 'top' },
          '51%': { transform: 'scaleY(1)', 'transform-origin': 'bottom' },
          '100%': { transform: 'scaleY(0)', 'transform-origin': 'bottom' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
