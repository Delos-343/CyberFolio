import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        neon: '0 0 20px rgba(34, 211, 238, 0.35), 0 0 60px rgba(168, 85, 247, 0.18)',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        cardStageIn: {
          '0%': { opacity: '0', transform: 'translate3d(0, 24px, 0) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        cardScanReveal: {
          '0%': {
            opacity: '0',
            clipPath: 'inset(0 100% 0 0 round 1.75rem)',
            transform: 'translate3d(-24px, 14px, 0) scale(0.98)',
            filter: 'blur(10px) brightness(0.85)',
          },
          '12%': {
            opacity: '0.42',
            clipPath: 'inset(0 90% 0 0 round 1.75rem)',
            transform: 'translate3d(-16px, 10px, 0) scale(0.985)',
            filter: 'blur(8px) brightness(0.9)',
          },
          '35%': {
            opacity: '0.82',
            clipPath: 'inset(0 56% 0 0 round 1.75rem)',
            transform: 'translate3d(-7px, 4px, 0) scale(0.993)',
            filter: 'blur(3px) brightness(0.98)',
          },
          '52%': {
            opacity: '1',
            clipPath: 'inset(0 28% 0 0 round 1.75rem)',
            transform: 'translate3d(-2px, 1px, 0) scale(0.998)',
            filter: 'blur(1px) brightness(1.03)',
          },
          '72%': {
            opacity: '1',
            clipPath: 'inset(0 7% 0 0 round 1.75rem)',
            transform: 'translate3d(0, 0, 0) scale(1.002)',
            filter: 'blur(0px) brightness(1.03)',
          },
          '100%': {
            opacity: '1',
            clipPath: 'inset(0 0 0 0 round 1.75rem)',
            transform: 'translate3d(0, 0, 0) scale(1)',
            filter: 'blur(0px) brightness(1)',
          },
        },
        cardScanBeam: {
          '0%': { transform: 'translate3d(-120%, 0, 0)', opacity: '0' },
          '8%': { opacity: '0.6' },
          '38%': { opacity: '0.95' },
          '64%': { opacity: '0.85' },
          '100%': { transform: 'translate3d(430%, 0, 0)', opacity: '0' },
        },
        cardScanLine: {
          '0%': { transform: 'translate3d(-160%, 0, 0)', opacity: '0' },
          '18%': { opacity: '0.45' },
          '48%': { opacity: '0.72' },
          '78%': { opacity: '0.4' },
          '100%': { transform: 'translate3d(460%, 0, 0)', opacity: '0' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 14s ease infinite',
      },
    },
  },
  plugins: [],
};

export default config;
