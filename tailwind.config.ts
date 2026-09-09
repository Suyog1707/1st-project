import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0A0A0A',
        ink: '#F5F2F0',
        tint: '#161515',
        primary: { DEFAULT: '#E50914', foreground: '#FFFFFF' },
        accent: { DEFAULT: '#F5B301', foreground: '#0A0A0A' },
        background: '#0A0A0A',
        foreground: '#F5F2F0',
        card: '#161515',
        'card-foreground': '#F5F2F0',
        muted: '#8A8683',
        'muted-foreground': '#B5B0AC',
        border: '#262322',
        input: '#1E1B1A',
        ring: '#E50914',
        destructive: '#E50914',
      },
      fontFamily: {
        display: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
