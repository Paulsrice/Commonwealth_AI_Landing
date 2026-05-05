import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem' },
      screens: { '2xl': '1440px' }
    },
    extend: {
      colors: {
        // —— Brand tokens
        carbon: {
          DEFAULT: '#0A0A0A',
          950: '#050505',
          900: '#0A0A0A',
          800: '#141414',
          700: '#1C1C1C',
          600: '#262626',
          500: '#333333'
        },
        ash: {
          DEFAULT: '#7A7A7A',
          900: '#2A2A2A',
          800: '#3D3D3D',
          700: '#5A5A5A',
          600: '#7A7A7A',
          500: '#9A9A9A',
          400: '#B8B8B8',
          300: '#D6D6D6',
          200: '#E8E8E8',
          100: '#F2F2F2'
        },
        cobalt: {
          DEFAULT: '#2E5BFF',
          50: '#EDF1FF',
          100: '#D6E0FF',
          200: '#A8BCFF',
          300: '#7A98FF',
          400: '#4C74FF',
          500: '#2E5BFF',
          600: '#1A47E6',
          700: '#1238B8',
          800: '#0A2A8C',
          900: '#061C5E'
        },
        // —— Shadcn semantic
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      letterSpacing: {
        tightest: '-0.045em'
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 9vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-xl': ['clamp(2.75rem, 6.5vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-lg': ['clamp(2rem, 4.5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }]
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite'
      }
    }
  },
  plugins: [animate]
};
