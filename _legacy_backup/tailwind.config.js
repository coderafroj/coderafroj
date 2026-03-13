/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#030014",
          card: "#0f172a",
          obsidian: "#020617",
        },
        primary: {
          DEFAULT: "#6366f1", // Indigo
          glow: "#818cf8",
        },
        secondary: {
          DEFAULT: "#ec4899", // Pink
          glow: "#f472b6",
        },
        accent: {
          DEFAULT: "#8b5cf6", // Violet
          glow: "#a78bfa",
        },
        cyber: {
          blue: "#3b82f6",
          purple: "#c084fc",
          ink: "#0a0a0c",
        },
        'dim-text': '#94a3b8',
        'text-muted': '#94a3b8',
      },
      fontFamily: {
        outfit: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.2' },
          '50%': { transform: 'scale(1.2)', opacity: '0.4' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 8s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
