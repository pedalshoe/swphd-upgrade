import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2f9',
          100: '#d5dff0',
          200: '#adc0e2',
          300: '#7a99ce',
          400: '#4d76ba',
          500: '#2d5aa0',
          600: '#1e3a5f',
          700: '#172d4a',
          800: '#102036',
          900: '#0a1524',
        },
        gold: {
          400: '#e6b84a',
          500: '#c9973e',
          600: '#a87830',
        },
        cream: '#faf9f6',
        // shadcn/ui CSS-variable tokens — consumed by hero-section-2 and future ui/ components
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--background) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
        },
        border: 'rgb(var(--border) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['var(--font-eb-garamond)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
